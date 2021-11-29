const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "UserProfile" },
        flightId: { type: Schema.Types.ObjectId, ref: "Flight" },
        bookingDate: { type: Date, default: Date.now() },
        seatId: { type: Schema.Types.ObjectId, ref: "Seat" },
        bookingStatus: {
            type: String
        },
        price:{type:Number},
        paidbyMileage:{type:Boolean, default:false},
    }
);

module.exports = mongoose.model("Booking", BookingSchema);