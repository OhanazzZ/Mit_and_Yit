const mongoose = require("mongoose");
const User = mongoose.model("user");
const expressValidator = require('express-validator');
const passport = require('passport');
const NO_ERROR = 0
const ERROR = 1


/************************** sign up page **************************/

// GET request - load signup page
const signupRender = async (req, res) => {
    res.render('signup');
}

// POST request - allow sign up
const signup = async (req, res) => {

    // check (and handle) any error in user input
    if (formValidation(req, res, "signup") == ERROR){
        return;
    }
    
    // get user input from http request and prepare it to be stored
    const userdata = getUserData(req, "signup");
    const user = new User();
    Object.assign(user, userdata);

    // save user data to the databse
    try{
        await user.save();
        res.render('login', {
            msg: 'You have successfully created an account'
        });
    } catch (err) {
        if (err.name==="MongoError" && err.code ===11000){
            res.render('signup', {
                msg: "username/email already exists."
            })
            return;
        }
        res.status(400);
        console.log(err);
        return res.send("Database query failed");
    }
};


/************************* log in/out page *************************/

// GET request - load login page
const loginRender = async (req, res) => {
    res.render('login');
}

// POST request - allow login
// users are redirected to the home page after successful login
const login = async (req, res, next) => {

    // check (and handle) any error in user input
    if (formValidation(req, res, "login") == ERROR){
        return;
    }

    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username: username});

    // handle login
    if (!user){
        res.render('login', {msg: 'Username not found'})
    } else if (password!=user.password){
        res.render('login', {msg: 'Incorrect password'})
    } else{
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/user/login',
            failureFlash: false
        })(req, res, next);
    }
}

// GET request - allow logout
const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}


/************************ user profile page ************************/

// GET request - load profile page
const profile = async (req, res) => {
    const user = req.user;
    res.render('profile', {user: user});
}

// GET request - load edit profile page
const editprofileRender = async (req, res) => {
    const user = req.user;
    res.render('edit_profile', {user: user});
}

// POST request - allow editing profile
const editProfile = async (req, res) => {
    
    const user = await User.findById(req.user._id)
    
    // check (and handle) any error in user input
    if (formValidation(req, res, "editProfile", user) == ERROR){
        return;
    }

    // get user input from http request and prepare it for update
    const userdata = getUserData(req, "editProfile");
    Object.assign(user, userdata);
    
    // update user profile
    try{
        await user.save();
        res.render('profile', {
            msg:'Profile has been updated.',
            user: user
        });
    } catch (err) {
        console.log(err);
        if (err.name === 'MongoError' && err.code === 11000) {
            res.render('edit_profile', {
                msg:'Username/email already existd.',
                user: user
            })
        } else{
            console.log(err);
            res.render('edit_profile', {
                msg: 'invalid input',
                user: user
            })
        }
    }
}


/************************** helper function **************************/

// access control - unauthenticated users are prompted to log in
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.render('index', {
            msg: "Please register or login"
        })
    }
}

// check validity of user input and handle the error
const formValidation = (req, res, purpose, user = null)=>{
    if (purpose == "login"){
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
    } else if (["signup", "editProfile"].includes(purpose)){
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Minimum length is 6 characters').isLength({min:6});
        req.checkBody('password2', 'Passwords don\'t matched.').equals(req.body.password);
    } else{
        console.log("double check your code!");
        return ERROR;
    }
    
    const errors = req.validationErrors();
    if(errors){
        if (purpose == "login"){
            res.render('login', {errors: errors});
            return ERROR;
        } else if (purpose == "signup"){
            res.render('signup', {errors: errors});
            return ERROR;
        } else if(purpose == "editProfile"){
            res.render('edit_profile', {errors: errors, user: user});
            return ERROR;
        }
    }
    return NO_ERROR;
}

// get user input from http request
const getUserData = (req, purpose = "signup")=>{
    const userdata = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        dietary: {
            cuisine: {
                first: req.body.first,
                second: req.body.second,
                third: req.body.third,
            },
            allergy: req.body.allergy,
            religion: req.body.religion,
        },
        availability: {
            lunch: req.body.lunch,
            dinner: req.body.dinner,
            coffee: req.body.coffee,
        }
    }
    if (purpose=="editProfile") {
        userdata.additional = {
            academic: {
                major: req.body.major,
                level: req.body.level
            },
            hobbies: req.body.hobbies,
            career: req.body.career
        }
    }
    return userdata;
}

module.exports = {
    signupRender,
    signup,
    loginRender,
    login,
    profile,
    editprofileRender,
    editProfile,
    logout,
    ensureAuthenticated
};