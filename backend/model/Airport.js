const mongoose = require('mongoose');
const AirportSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        shortCode:{
            type: String,
            unique: true
        },
        city:{
            type: String,
        }

    }
);
module.exports = mongoose.model("Airport", AirportSchema);