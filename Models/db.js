
var mongoose = require('mongoose');

const uri = "mongodb+srv://Abigail:Zkc20000426@cluster0-av4r4.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri,
    function(err){
        if(!err){
            console.log('Connected to mongo.');
        }else{
            console.log('Failed to connect to mongo!', err);
        }
    });

require('./user.js');
