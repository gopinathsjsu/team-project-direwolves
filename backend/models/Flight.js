const mongoose = require('mongoose');
const FlightSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        airlineId: { type: Schema.Types.ObjectId, ref: "Airline" },
        airplaneId: { type: Schema.Types.ObjectId, ref: "Airplane" },
        number:{
            type: Number
        },
        arrivalAirport:{
            type: String
        },
        departureAirport:{
            type: String
        },
        arrivalDateTime: { type: Date },
        departureDateTime: { type: Date },
    }
);
module.exports = mongoose.model("Flight", Flightchema);