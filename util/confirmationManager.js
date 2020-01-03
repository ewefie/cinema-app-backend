const { Booking } = require('../models/booking')
const { notifyBookingMade, notifyBookingConfirmed } = require('../util/mailer')

const autoDestructNotConfirmedBooking = async (bookingId) => {
    await Booking.findByIdAndDelete(bookingId, (err, booking) => {
        if (err) return err.message;
        const response = {
            message: "Not confirmed booking expired",
            id: bookingId
        };
        console.log(response);
    })
};

const checkIfBookingConfirmed = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) return;
    const isConfirmed = booking.confirmed;
    if (!isConfirmed) autoDestructNotConfirmedBooking(bookingId);
};


exports.checkIfBookingConfirmed = checkIfBookingConfirmed;


