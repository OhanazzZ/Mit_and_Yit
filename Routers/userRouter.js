const express = require('express');
const usersRouter = express.Router();
const userController = require("../Controllers/userController");
//const Joi = require('joi');

//var users = require('../Models/user');

//Route for GET method
//can also define app.post, app.delete, or other HTTP methods
usersRouter.get('/', (req, res) => {
    //return the response
    userController.getAllUsers(req, res);
});

//register form
usersRouter.get('/register', (req, res) => {
    res.render('register');
});

//register process
/*usersRouter.get('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name cannot be empty').nonEmpty();
    req.checkBody('email', 'Email cannot be empty').nonEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username cannot be empty').nonEmpty();
    req.checkBody('password', 'Password is invalid').nonEmpty();
    req.checkBody('password2', 'Passwords do not matched').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors) {
        res.render('register', {
            errors:errors
        });
    } else {
        res.send('Welcome to Mit&Yit! You have successfully registered ;)')
    }

});*/

usersRouter.get('/register', (req, res) => {
    res.render('register');
});

//login form
usersRouter.get('/login', (req, res) => {
    res.render('login');
});

//get user by cuisine
usersRouter.get('/select/:cuisine', (req, res) => {
    userController.getUserByCuisine(req, res);
});

//update, add and delete
usersRouter.post('/add', userController.addUser);
usersRouter.post('/update/:username', userController.updateCuisineByName);
usersRouter.delete('/delete/:username', userController.deleteUser);


//export the router so that app.js can import it
module.exports = usersRouter;