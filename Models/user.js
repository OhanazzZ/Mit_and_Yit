/*function User(username, cuisine){
    this.username = username;
    this.cuisine = cuisine;
}*/

const user = [
    {"username": "Abigail",
        "cuisine": "Japanese",
        "review": "2"},
    {"username": "Sam",
        "cuisine": "Spanish",
        "review": "4"},
    {"username": "Estella",
        "cuisine": "Chinese",
        "review": "5"},
    {"username": "Florence",
        "cuisine": "Italian",
        "review": "3"},
    {"username": "Marie",
        "cuisine": "Italian",
        "review": "1"},
    {"username": "Paul",
        "cuisine": "Korean",
        "review": "3"},
    {"username": "Kathy",
        "cuisine": "Japanese",
        "review": "4"},
    {"username": "Alice",
        "cuisine": "Chinese",
        "review": "5"},
    {"username": "Bill",
        "cuisine": "Spanish",
        "review": "4"}
];

module.exports = user;

/*
class User {
    constructor(username, cuisine) {
        this.username = username;
        this.cuisine = cuisine;
    }
}*/



/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    email: String,
    username: String,
    password: String,
}, {collection: 'Mit&Yit'});

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});

const Comment = new Schema({
  name: { type: String, default: 'hahaha' },
  age: { type: Number, min: 18, index: true },
  bio: { type: String, match: /[a-z]/ },
  date: { type: Date, default: Date.now },
  buff: Buffer
});

mongoose.model('user', userSchema);*/
