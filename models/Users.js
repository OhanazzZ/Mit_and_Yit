const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    dietary: {
        allergy: {
            type: String,
            enum:["veg", "dairy", "gluten", "nut", "seafood"]
        },
        religion: {
            type: String,
            enum:["Hindu","Jewish","Islamic"]
        }
    },
    comment: {
        type: String,
        maxlength: 30
    },
    availability: {
        lunch: Boolean,
        dinner: Boolean,
        coffee: Boolean
    },
    additional: {
        academic: {
            major: String,
            level: Number,
        },
        hobbies: [String],
        career: [String],
        numberOfPerson: Number
    },
    reviewid: String
})

const User = mongoose.model("user", userSchema, "user");
module.exports = User;




















/* let users = [
    {
        id:1,
        username : "user1",
        email : "email_1@gmail.com",
        cuisine : "Japanese",
        lunch  : true,
        dinner  : true,
        coffee_lightMeal : true,
        reviewIndex: 0,
    },
    {
        id:2,
        username : "user2",
        email : "email_2@gmail.com",
        cuisine : "Japanese",
        lunch  : true,
        dinner  : false,
        coffee_lightMeal : true,
        reviewIndex: 1,
    },
    {
        id:3,
        username : "user3",
        email : "email_3@gmail.com",
        cuisine : "Japanese",
        lunch  : true,
        dinner  : true,
        coffee_lightMeal : false,
        reviewIndex: 2,
    },
    {
        id:4,
        username : "user4",
        email : "email_4@gmail.com",
        cuisine : "Japanese",
        lunch  : false,
        dinner  : true,
        coffee_lightMeal : true,
        reviewIndex: 3,
    },
    {
        id:5,
        username : "user5",
        email : "email_5@gmail.com",
        cuisine : "Italian",
        lunch  : false,
        dinner  : true,
        coffee_lightMeal : true,
        reviewIndex: 4,
    },
    {
        id:6,
        username : "user6",
        email : "email_6@gmail.com",
        cuisine : "Chinese",
        lunch  : true,
        dinner  : false,
        coffee_lightMeal : true,
        reviewIndex: 5,
    },
    {
        id:7,
        username : "user7",
        email : "email_7@gmail.com",
        cuisine : "Italian",
        lunch  : true,
        dinner  : true,
        coffee_lightMeal : false,
        reviewIndex: 6,
    },
    {
        id:8,
        username : "user8",
        email : "email_8@gmail.com",
        cuisine : "Chinese",
        lunch  : true,
        dinner  : true,
        coffee_lightMeal : true,
        reviewIndex: 7,
    },
    {
        id:9,
        username : "user9",
        email : "email_9@gmail.com",
        cuisine : "Chinese",
        lunch  : true,
        dinner  : true,
        coffee_lightMeal : true,
        reviewIndex: 8,
    }
];

module.exports = users; */