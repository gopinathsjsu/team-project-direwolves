const mongoose = require('mongoose');
const UserProfileSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        firstName:{
            type: String
        },
        lastName:{
            type: String
        },
        password:{
            type: String
        },
        address:{
            type: String
        },
        mileagePoint:{
            type: Number
        },
        isAdmin:{
            type: Boolean, default: false
        }

    }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema); 