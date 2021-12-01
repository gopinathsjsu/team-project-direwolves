const mongoose = require("mongoose");
const { Schema } = mongoose;
const FlightSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  airlineId: { type: Schema.Types.ObjectId, ref: "Airline" },
  airplaneId: { type: Schema.Types.ObjectId, ref: "Airplane" },
  number: { type: Number, required: true },
  arrivalAirport: { type: Schema.Types.ObjectId, ref: "Airport" },
  departureAirport: { type: Schema.Types.ObjectId, ref: "Airport" },
  arrivalDateTime: { type: Date },
  departureDateTime: { type: Date },
  price: { type: Number },
});
module.exports = mongoose.model("Flight", FlightSchema);
