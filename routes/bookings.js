const { Booking, validatePost, validatePut } = require('../models/booking');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const bookings = await Booking.find();
    res.send(bookings);
});

router.get('/:id', async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send('The booking with the given ID was not found.');
    res.send(booking);
});

router.post("/", async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let booking = new Booking({
        customer: req.body.customer,
        seats: req.body.seats,
        showtimeId: req.body.showtimeId
    });
    await booking.save();
    res.send(booking);
});

router.put('/:id', async (req, res) => {
    const { error } = validatePut(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const booking = await Booking.findByIdAndUpdate(req.params.id, {
        confirmed: req.body.confirmed
    });
    if (!booking) return res.status(404).send('The booking with the given ID was not found.')

    res.send(booking);
});

module.exports = router;