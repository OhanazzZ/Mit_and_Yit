var users = require("../models/Users");
var reviews = require("../models/Review");

// GET request - get reviews for an user by user id
const getReviewById = (req, res) => {
    const userInfo = users.find(user => user.id === parseInt(req.params.id));
    res.send("The reviews for user " + userInfo.username + " are " + JSON.stringify(reviews[userInfo.reviewIndex]));
};

// POST request - post a review as an user by user id
// const updateReviewById = (req, res) => {
//     const userInfo = users.find(user => user.id === parseInt(req.params.id));
//     const newReview = req.body.review;
//     reviews[userInfo.reviewIndex].review.push(newReview);
//     res.send("The reviews for user " + userInfo.username + " are " + JSON.stringify(reviews[userInfo.reviewIndex]));
// };

module.exports = {
    getReviewById,
    //updateReviewById,
};