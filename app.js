const express = require('express');
const app = express();

//import routers
const userRouter = require('./Routers/userRouter');

app.get('/', (req, res) => {
    //return the response
    res.send("<H1>Welcome to Mit&Yit.</H1>");
});

// go through the router first before doing the following
app.use('/user-management', userRouter);


//app.listen() tells express that we want to start a web server on port 8000
app.listen(8000, () => {
    console.log('Mit&Yit is currently launching...')
});