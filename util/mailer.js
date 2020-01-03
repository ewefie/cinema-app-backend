const nodemailer = require('nodemailer');
const { Booking } = require('../models/booking');
const { createBookingMessage, createConfirmationMessage } = require('./message');
const { checkIfBookingConfirmed } = require('./confirmationManager');

const TIME_TO_CONFIRM = 20000;
// const TIME_TO_CONFIRM = 3600000;


let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "cc881f0c6cbd93",
        pass: "4f03748d5906f1"
    }
});

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
            console.log(info);
        }
        setTimeout(() => {
            checkIfBookingConfirmed(booking._id)
        }, TIME_TO_CONFIRM);
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