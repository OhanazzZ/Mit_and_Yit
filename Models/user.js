const user = [
    {"username": "Abigail",
        "cuisine": "Japanese"},
    {"username": "Sam",
        "cuisine": "Spanish"},
    {"username": "Estella",
        "cuisine": "Chinese"},
    {"username": "Florence",
        "cuisine": "Italian"}
];

module.exports = user;


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
