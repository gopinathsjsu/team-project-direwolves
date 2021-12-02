const mongoose = require('mongoose');
const AirplaneSchema = new mongoose.Schema(
    {
        noOfSeats:{
            type: Number
        },
        premiumSeatPrice:{
            type:Number, default:100
        },
        seats:[{
            seatId: { type: mongoose.Schema.Types.ObjectId, ref:"Seat" }
        }],
    }
);

module.exports = mongoose.model("Airplane", AirplaneSchema);