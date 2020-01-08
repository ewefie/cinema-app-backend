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


const confrimSeatsAreNotTaken = async (seatsToTake, showtimeId) => {
    const taken = await getAllSeatsForShowtime(showtimeId);

    for (const seatInBase of taken) {
        for (const incomingSeat of seatsToTake) {
            if (JSON.stringify(seatInBase) === (JSON.stringify(incomingSeat))) return false;
        }
    }
    return true;
}

const getAllSeatsForShowtime = async (showtimeId) => {
    const bookings = await Booking.find({ 'showtimeId': showtimeId });
    let seatsToSend = [];
    const seatsTaken = bookings.map(booking => {
        return booking.seats.map(seat => {
            return { row: seat.row, column: seat.column }
        })
    });
    seatsTaken.forEach(element => {
        seatsToSend.push(...element);
    });
    return seatsToSend;
}

exports.getAllSeatsForShowtime = getAllSeatsForShowtime;
exports.confrimSeatsAreNotTaken = confrimSeatsAreNotTaken;
exports.checkIfBookingConfirmed = checkIfBookingConfirmed;
exports.removeNotConfirmedBookings = removeNotConfirmedBookings;


