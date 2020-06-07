const mongoose = require("mongoose");
const User = mongoose.model("user");
const FAILURE = 0;
const SUCCESS = 1;

/*************************** load pages ****************************/

// GET request - load root page
const reviewRender = async (req, res) => {
    res.render('review');
};

// GET request - view reviews written by other users
const viewRender = async (req, res) => {
    const review = req.user.review;
    if (review[0]===undefined) {
        res.render('view_review', {
            empty: "you don't have reviews from other users yet",
            reviews: review
        });
    } else {
        res.render('view_review', {
            reviews: review
        });
    }
};

// GET request - load write review page
const writeRender = async (req, res) => {
    res.render('write_review');
};


/*************************** write review ***************************/
const writeReview = async (req, res) => {

    const errors = [];
    if (!req.body.username) {
        errors.push({param: 'username', msg: 'Username is required', value: ''});
    }
    if (!req.body.rating) {
        errors.push({param: 'rating', msg: 'Rating is required', value: ''});
    }
    if (!req.body.tag) {
        errors.push({param: 'tag', msg: 'Tag is required', value: ''});
    }

    if (errors.length != 0){
        res.render('write_review', { errors: errors});
        return;
    }

    // make sure the review receiver is valid
    if (checkValidReviewReceiver(req,res) != SUCCESS){
        return;
    }

    try{
        const review = {
            from: req.user.username,
            rating: req.body.rating,
            tag: req.body.tag,
            comment: req.body.comment,
        }
        await User.updateOne(
            {"username": req.body.username},
            {$push: {"review": review}});
        res.render('write_review', {
            msg: "You have successfully written a review."})
        return
    } catch(err) {
        console.log(err);
        res.send("Database query failed");
    }
}

/************************* helper function *************************/

// the receiver has to have a match history with the writer
// and has to be a user of the app
const checkValidReviewReceiver = (req,res) =>{
    const query = {$and: [
        {$or: [
            {$and: [
                {"history.from": req.user.username},
                {"history.to": req.body.username},
            ]},
            {$and: [
                {"history.to": req.user.username},
                {"history.from": req.body.userbane},
            ]},
            {$and: [
                {"username": req.user.username},
                {"username": req.body.userbane},
            ]},
        ]}
    ]} 
    const exist = User.findOne(query);
    if (!exist) {
        res.render('write_review', {
            msg: "you are not friend with this user."
        })
        return FAILURE;
    }
    return SUCCESS;
}


module.exports = {
    reviewRender,
    writeRender,
    viewRender,
    writeReview,
};