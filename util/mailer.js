const nodemailer = require('nodemailer');
const { createBookingMessage, createConfirmationMessage } = require('./message');

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