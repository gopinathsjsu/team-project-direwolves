const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "UserProfile" },
        flightId: { type: Schema.Types.ObjectId, ref: "Flight" },
        departureTime: { type: Date },
        arrivalTime:{ type: Date },
        bookingDate: { type: Date, default: Date.now() },
        seatNumber: { type: String },
        bookingStatus: { type: String },
        price:{type:Number},
        isMileage:{ type:Boolean, default:false },
    }
);

module.exports = mongoose.model("Booking", BookingSchema);