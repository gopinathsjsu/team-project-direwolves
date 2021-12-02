const mongoose = require('mongoose');
const AirplaneSchema = new mongoose.Schema(
    {
        noOfSeats:{
            type: Number
        },
        premiumSeatPrice:{
            type:Number, default:3
        }
    }
);

module.exports = mongoose.model("Airplane", AirplaneSchema);