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
        mileageId: { type: Schema.Types.ObjectId, ref: "Mileage" },
    }
);

module.exports = mongoose.model("Booking", BookingSchema);