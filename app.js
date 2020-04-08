const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//pass the body first before router
app.use(bodyParser.json()); //accept Json
app.use(bodyParser.urlencoded({extended: true})); //accept url

//import routers
const userRouter = require('./Routers/userRouter');

app.get('/', (req, res) => {
    //return the response
    res.send("<H1>Welcome to Mit&Yit.</H1>");
});

// go through the router first before doing the following
app.use('/user', userRouter);

app.use('/user/:name', userRouter);



//app.listen() tells express that we want to start a web server on port 8000
app.listen(8000, () => {
    console.log('Mit&Yit is currently launching...')
});