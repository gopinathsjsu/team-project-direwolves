const mongoose = require('mongoose');
const { Schema } = mongoose;

const MileageSchema = new mongoose.Schema(
    {
        points: {
            type: Number
        },
    }
);

module.exports = mongoose.model("Mileage", MileageSchema);