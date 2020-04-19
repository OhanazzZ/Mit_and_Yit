const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const mongoose  = require('mongoose');


require('./models/db.js');

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//pass the body first before router
app.use(express.json());
app.use(bodyParser.json()); //accept Json
app.use(bodyParser.urlencoded({extended: true})); //accept url

app.get('/', (req, res) => {
    //return the response
    res.render('index');
});

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//import routers
const userRouter = require('./Routers/userRouter');

// go through the router first before doing the following
app.use('/user', userRouter);
app.use('/user/:name', userRouter);



//environment variable PORT
/*const port = process.env.PORT || 8000;

//app.listen() tells express that we want to start a web server on port 8000
app.listen(port, () => {
    console.log('Mit&Yit is currently launching...')
});*/

app.listen(process.env.PORT || 8000, function(){
    console.log("Mit&Yit is currently launching, server listening on port %d in %s mode...", this.address().port, app.settings.env);
});