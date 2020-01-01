const nodemailer = require('nodemailer');
const { Booking } = require('../models/booking');
const { createBookingMessage, createConfirmationMessage } = require('./message');

const timeForConfirmation = 3600000;

let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "cc881f0c6cbd93",
        pass: "4f03748d5906f1"
    }
});

const autoDestructNotConfirmedBooking = (bookingId) => {
    console.log('usuwam niepotwierdzony booking', bookingId)
};

const checkIfBookingConfirmed = async (bookingId) => {
    console.log("sprawdzam czy potwierdzone", bookingId)
    const booking = await Booking.findById(bookingId);
    if (!booking) return;
    const isConfirmed = booking.confirmed;
    console.log(isConfirmed);
    if (!isConfirmed) autoDestructNotConfirmedBooking(bookingId);
};

const notifyBookingMade = (booking) => {
    const message = {
        from: 'bookings@allcinemasinoneplace.com',
        to: `${booking.customer.email}`,
        subject: 'Showtime booking',
        html: `${createBookingMessage(booking)}`
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            setTimeout(() => {
                checkIfBookingConfirmed(booking._id)
            }, timeForConfirmation);
            console.log(info);
        }
    });
};
const notifyBookingConfirmed = (booking) => {
    const message = {
        from: 'bookings@allcinemasinoneplace.com',
        to: `${booking.customer.email}`,
        subject: 'Showtime booking',
        html: `${createConfirmationMessage(booking)}`
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
};
exports.notifyBookingConfirmed = notifyBookingConfirmed;
exports.notifyBookingMade = notifyBookingMade;