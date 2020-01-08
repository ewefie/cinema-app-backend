const Joi = require('joi');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            email: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    seats: {
        type: [new mongoose.Schema({
            row: {
                type: Number,
                min: 0,
                max: 24
            },
            column: {
                type: Number,
                min: 0,
                max: 29
            }
        })],
        required: true
    },
    showtimeId: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

// bookingSchema.index({ showtimeId: 1, seats: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

const validatePostBooking = (booking) => {
    const schema = {
        customer: Joi.object().keys({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(5).max(50).required().email(),
        }).required(),
        seats: Joi.array().items(Joi.object().keys({
            row: Joi.number().min(0).max(24).required(),
            column: Joi.number().min(0).max(29).required()
        })).required(),
        showtimeId: Joi.string().min(5).max(255).required(),
        confirmed: Joi.boolean().optional()
    };
    return Joi.validate(booking, schema);
};

const validatePutBooking = (booking) => {
    const schema = {
        confirmed: Joi.boolean().required()
    };
    return Joi.validate(booking, schema);
};

exports.Booking = Booking;
exports.validatePost = validatePostBooking;
exports.validatePut = validatePutBooking;