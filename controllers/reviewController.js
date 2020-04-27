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

    reviews[user.reviewIndex].review.push(req.body);
    res.send({
        "user": user.username, 
        "has reviews": reviews[user.reviewIndex]
    });
};

const updateReview = (req, res) =>{
    const receiver = users.find(user => user.id === parseInt(req.params.receiverid));
    const writter = users.find(user => user.id === parseInt(req.params.writterid));
    if (!writter){
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }
    if (!receiver){
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }

    reviews[receiver.reviewIndex].review.forEach(review => {
        if (review.givenBy === writter.id){
            Object.assign(review, req.body)
        }
    })
    
    res.send({
        "user": receiver.username, 
        "has reviews": reviews[receiver.reviewIndex]
    });
}

module.exports = {
    reviewWrittenToUserId,
    writeReviewToUserId,
    updateReview
};