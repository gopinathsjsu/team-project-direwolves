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
        role:{
            type: String
        },

    }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema); 