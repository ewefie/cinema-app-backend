const nodemailer = require('nodemailer');
const { Booking } = require('../models/booking');
const { createBookingMessage, createConfirmationMessage } = require('./message');
const { checkIfBookingConfirmed } = require('./confirmationManager');
const dotenv = require('dotenv');

dotenv.config();

const TIME_TO_CONFIRM = 300000;


let transport = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 25,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.API_KEY
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
            console.log(err.message, process.env.USER, process.env.API_KEY)
        } else {
            console.log(info);
        }
        setTimeout(() => {
            console.log(checkIfBookingConfirmed);
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