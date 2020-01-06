const { Booking, validatePost } = require('../models/booking');
const { confrimSeatsAreNotTaken, getAllSeatsForShowtime } = require('../util/confirmationManager');
const mongoose = require('mongoose');
const { notifyBookingMade, notifyBookingConfirmed } = require('../util/mailer')
const express = require('express');
const router = express.Router();

const ROW_LENGTH = 30;
const ROWS = 25;

// **only for tests**
router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Provided ID is incorrect.');
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send('The booking with the given ID was not found.');
    res.send(booking);
});

router.get('/confirm/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Provided ID is incorrect.');
    const booking = await Booking.findByIdAndUpdate(req.params.id, {
        confirmed: true
    }, { new: true });
    if (!booking) return res.status(404).send('The booking with the given ID was not found.')
    if (booking.confirmed == true) notifyBookingConfirmed(booking);
    // res.send(booking);
    res.send('Booking confirmed!');
})

router.get('/showtime/:showtimeId', async (req, res) => {
    const seatsToSend = await getAllSeatsForShowtime(req.params.showtimeId);
    res.send({
        rows: ROWS,
        rowLength: ROW_LENGTH,
        seatsTaken: seatsToSend
    });
});

router.post("/", async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const seatsNotTaken = await confrimSeatsAreNotTaken(req.body.seats, req.body.showtimeId);
    //status?
    if (!seatsNotTaken) return res.send("You are late, one on seats is already booked.")

    console.log(seatsNotTaken)
    let booking = new Booking({
        customer: req.body.customer,
        seats: req.body.seats,
        showtimeId: req.body.showtimeId
    });
    await booking.save((err) => {
        if (err) return res.status(500).send(err);
        notifyBookingMade(booking);
        res.send(booking);
    });
});

module.exports = router;