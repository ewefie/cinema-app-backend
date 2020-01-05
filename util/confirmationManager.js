const { Booking } = require('../models/booking')
// const { notifyBookingMade, notifyBookingConfirmed } = require('../util/mailer')
const TIME_TO_CONFIRM = 300000;

const autoDestructNotConfirmedBooking = async (bookingId) => {
    await Booking.findByIdAndDelete(bookingId, (err) => {
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

const removeNotConfirmedBookings = async () => {
    const currentDateTimeMinusOffset = new Date().getTime() - TIME_TO_CONFIRM;
    const notConfirmed = await Booking.find({ 'confirmed': false });

    notConfirmed.forEach(booking => {
        const dateCreated = booking.createdAt;
        if (dateCreated.getTime() < currentDateTimeMinusOffset) {
            autoDestructNotConfirmedBooking(booking._id);
        }
    });
}


exports.checkIfBookingConfirmed = checkIfBookingConfirmed;
exports.removeNotConfirmedBookings = removeNotConfirmedBookings;


