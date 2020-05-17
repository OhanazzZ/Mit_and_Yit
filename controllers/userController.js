const mongoose = require("mongoose");
const User = mongoose.model("user");
var expressValidator = require('express-validator');
const passport = require('passport');

// GET request - load signup page
const signupRender = async (req, res) => {
    res.render('signup');
}

// POST request - allow sign up
const signup = async (req, res) => {

    try{
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password with minimum length 6 chars is required').isLength({min:6});
        req.checkBody('password2', 'Password is not matched.').equals(req.body.password);

        let errors = req.validationErrors();

        if(errors){
            res.render('signup', {
                errors: errors,
            });
        } else {
            let user = new User();

            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.gender = req.body.gender;
            user.cuisine = req.body.cuisine;
            user.allergy = req.body.allergy;
            user.religion = req.body.religion;
            user.lunch = req.body.lunch;
            user.dinner = req.body.dinner;
            user.coffee = req.body.coffee;

            user.save(function(err){
                if(err){
                    if (err.name === 'MongoError' && err.code === 11000) {
                        res.render('signup', {msg:'Username/email already existd.'})
                    } 
                    return;
                } else {
                    id = user._id;
                    req.user = user;
                    res.render('login', {msg:'You have successfully created an account'});
                }
            })
        }
    }catch (err) {
        res.status(400);
        console.log(err);
        return res.send("Database query failed");
    }
};

// GET request - load login page
const loginRender = async (req, res) => {
    res.render('login');
}

// POST request - allow login
const login = async (req, res, next) => {

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();

        if(errors){
            res.render('login', {
                errors: errors
            });
        } else {
            const username = req.body.username;
            const password = req.body.password;
            const users = await User.find({username: username});
            const user = users[0];

            if(!user){
                res.render('login', {msg:'Username not found'})
            }else if(password!=user.password){
                res.render('login', {msg:'Incorrect password'})
            }else{
                passport.authenticate('local', {
                    successRedirect:'/home',
                    failureRedirect:'/user/login',
                    failureFlash: false
            })(req, res, next);
        }
    }
}

// logout
const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

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
    try{
        const user = req.user;

        req.checkBody('username', 'Username cannot be empty').notEmpty();
        req.checkBody('email', 'Email is required').isEmail();
        req.checkBody('password', 'Password cannot be empty').notEmpty();
        req.checkBody('password', 'Password is too short').isLength({min:6})
        req.checkBody('password2', 'Password is not matched.').equals(req.body.password);

        let errors = req.validationErrors();

        if(errors){
            res.render('edit_profile', {
                errors: errors,
                user: user
            });
        } else {

            let query = {_id: req.user._id};

            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.password2 = req.body.password2;
            user.gender = req.body.gender;
            user.cuisine = req.body.cuisine;
            user.allergy = req.body.allergy;
            user.religion = req.body.religion;
            user.major = req.body.major;
            user.level = req.body.level;
            user.hobbies = req.body.hobbies;
            user.career = req.body.career;
            user.lunch = req.body.lunch;
            user.dinner = req.body.dinner;
            user.coffee = req.body.coffee;

            User.updateOne(query, user, function(err){
                if(err){
                    if (err.name === 'MongoError' && err.code === 11000) {
                        res.render('edit_profile', {
                            msg:'Username/email already existd.',
                            user: user
                        })
                    } 
                    return;
                } else {
                    res.render('profile', {
                        msg:'Profile has been updated.',
                        user: user
                    });
                }
            })
        }
    } catch (err) {
        res.status(400);
        console.log(err);
        return res.send("Database query failed");
    }
}

//Access Control
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.render('index', {
            msg: "Please register or login"
        })
    }
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