const { Booking } = require('../models/booking')


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
    console.log("sprawdzam czy potwierdzone", bookingId)
    const booking = await Booking.findById(bookingId);
    if (!booking) return;
    const isConfirmed = booking.confirmed;
    console.log(isConfirmed);
    if (!isConfirmed) autoDestructNotConfirmedBooking(bookingId);
};

const confirmBooking = () => {

};

exports.checkIfBookingConfirmed = checkIfBookingConfirmed;
exports.confirmBooking = confirmBooking;


