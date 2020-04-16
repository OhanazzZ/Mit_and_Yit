
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//pass the body first before router
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


//app.listen() tells express that we want to start a web server on port 8000
app.listen(8000, () => {
    console.log('Mit&Yit is currently launching...')
});