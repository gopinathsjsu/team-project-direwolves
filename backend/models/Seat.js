const mongoose = require('mongoose');
const SeatSchema = new mongoose.Schema(
    {
        rowNumber:{
            type: Number
        },
        seatPosition:{
            type: String
        },
        type:{
            type: String
        }
    }
);

module.exports = mongoose.model("Seat", SeatSchema);