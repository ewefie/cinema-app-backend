const { Booking, validatePost, validatePut } = require('../models/booking');
const mongoose = require('mongoose');
const { notifyBookingMade, notifyBookingConfirmed } = require('../util/mailer')
const express = require('express');
const router = express.Router();


// **only for tests**
router.get('/', async (req, res) => {
    const bookings = await Booking.find();
    res.send(bookings);
});

// **only for tests**
// router.get('/:id', async (req, res) => {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).send('The booking with the given ID was not found.');
//     res.send(booking);
// });


router.get('/:showtimeId', async (req, res) => {
    const bookings = await Booking.find({ 'showtimeId': req.params.showtimeId });
    let seatsToSend = [];
    const seatsTaken = bookings.map(booking => {
        return booking.seats.map(seat => {
            return [seat.row, seat.number]
        })
    });
    seatsTaken.forEach(element => {
        seatsToSend.push(...element);
    });
    res.send(seatsToSend);
});

router.post("/", async (req, res) => {
    // check if seats are not taken for this showtime
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
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


router.put('/:id', async (req, res) => {
    const { error } = validatePut(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const booking = await Booking.findByIdAndUpdate(req.params.id, {
        confirmed: req.body.confirmed
    }, { new: true });
    if (!booking) return res.status(404).send('The booking with the given ID was not found.')
    if (booking.confirmed == true) notifyBookingConfirmed(booking);
    res.send(booking);
});

// **only for tests**
router.delete('/:id', async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id, (err, booking) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Not confirmed booking expired",
            id: booking.id
        };
        return res.status(200).send(response);
    })
})

module.exports = router;