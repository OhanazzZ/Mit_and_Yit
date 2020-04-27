const express = require('express');
const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController.js");

// GET request - get reviews for an user by user id
reviewRouter.get('/view/:id', reviewController.getReviewById);

// POST request - post a review as an user by user id
//reviewRouter.post('/post/:id', reviewController.updateReviewById);

module.exports = reviewRouter;