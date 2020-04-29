var users = require("../models/Users");
var reviews = require("../models/Review");

// GET request - get reviews written to the user identifiable by the provided ID
const reviewWrittenToUserId = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user){
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }
    
    res.send({
        "user" : user.username ,
        "has reviews": reviews[user.reviewIndex]
    });
};

// POST request - write a review to the user identifiable by the provided ID
const writeReviewToUserId = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user){
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }

    const allScore = reviews[user.reviewIndex].score * reviews[user.reviewIndex].scoreNum;
    reviews[user.reviewIndex].review.push(req.body);
    reviews[user.reviewIndex].scoreNum += 1;
    reviews[user.reviewIndex].score = (allScore + req.body.score) / reviews[user.reviewIndex].scoreNum;
    res.send({
        "user": user.username, 
        "has reviews": reviews[user.reviewIndex]
    });
};


 //PATCH request - update an exisiting review to the user identifiable by the provided ID
 const updateReview = (req, res) => {
     const user = users.find(user => user.id === parseInt(req.params.id));
     if (!user) {
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }

    const newReview = req.body;
    reviews[user.reviewIndex].review.forEach(review => {
        if (review.givenBy === newReview.givenBy) {
            const allScore = reviews[user.reviewIndex].score * reviews[user.reviewIndex].scoreNum - review.score;
            Object.assign(review, newReview)
            reviews[user.reviewIndex].score = (allScore + newReview.score) / reviews[user.reviewIndex].scoreNum;
        } 
    });

    res.send({
        "user": user.username, 
        "has reviews": reviews[user.reviewIndex]
    });
 }

module.exports = {
    reviewWrittenToUserId,
    writeReviewToUserId,
    updateReview
};