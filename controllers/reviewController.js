const mongoose = require("mongoose");
const User = mongoose.model("user");
var expressValidator = require('express-validator');
const passport = require('passport');

const reviewRender = async (req, res) => {
    res.render('review');
};

const writeRender = async (req, res) => {
    res.render('write_review');
};

const writeReview = async (req, res) => {

    try{
        req.checkBody("username", "Please input the user you want to review").notEmpty()
        req.checkBody("rating", "Please rate the user you want to review").notEmpty()
        req.checkBody("tag", "Please choose a tag for the user you want to review").notEmpty()

        let errors = req.validationErrors();
        if(errors){
            res.render('write_review', { errors: errors});
            return;
        }

        const check = {
            $and: [
                {$or:[
                    {$and:[
                        {"history.from": req.user.username},
                        {"history.to": req.body.username},
                    ]},
                    {$and:[
                        {"history.to": req.user.username},
                        {"history.from": req.body.userbane},
                    ]},
                    {$and:[
                        {"username": req.user.username},
                        {"username": req.body.userbane},
                    ]},
                ]}
            ]
        }    
        
        const history = await User.findOne(check);
        console.log(history);
        if (!history) {
            res.render('write_review', {msg: "Sorry you are not eligible to write reviews for this user"})
            return
        } else {
            const review = {
                from: req.user.username,
                rating: req.body.rating,
                tag: req.body.tag,
                comment: req.body.comment,
            }
            await User.updateOne({"username": req.body.username}, {$push: {"review": review}});
            res.render('write_review', {msg: "You have successfully write a review, another one?"})
            return
        } 
    } catch(err) {
        console.log(err);
        res.send("Database query failed");
    }

}

const viewRender = async (req, res) => {
    const review = req.user.review;
    if (review[0]===undefined) {
        res.render('view_review', {empty: "Currently you don't have reviews from other users", reviews: review});
    } else {
        res.render('view_review', {reviews: review});
    }
};

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
    reviewRender,
    writeRender,
    viewRender,
    writeReview,
    ensureAuthenticated
};