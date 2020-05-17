const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    cuisine: {
        type: String,
        default: null
    },
    allergy: {
        type: String,
        default: null
    },
    religion: {
        type: String,
        default: null
    },
    comment: {
        type: String,
        maxlength: 30
    },
    lunch: String,
    dinner: String,
    coffee: String,
    major: {
        type:String,
        default: null
    },
    level: Number,
    hobbies: {
        type:String,
        default: null
    },
    career: {
        type:String,
        default: null
    },
    reviewid: {
        type: String
    }
})

const User = mongoose.model("user", userSchema, "user");
module.exports = User;