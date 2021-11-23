const mongoose = require('mongoose');
const AirlineSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        airplanes: [{
            airplaneId: { type: mongoose.Schema.Types.ObjectId, ref:"Airplane" },
        }],
        flights: [{
            flightId: { type: mongoose.Schema.Types.ObjectId, ref:"Flight" },
        }]

    }
);
module.exports = mongoose.model("Airline", AirlineSchema); 