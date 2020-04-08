const express = require('express');
const app = express();

//Route for GET method
//can also define app.post, app.delete, or other HTTP methods
app.get('/', (req, res) => {
    //return the response
    res.send("Welcome to Mit&Yit.");
});

//app.listen() tells express that we want to start a web server on port 8000
app.listen(8000, () => {
    console.log('Mit&Yit is currently launching...')
});