const express = require('express');
const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController.js");

// get reviews written to the user identifiable by the provided ID
reviewRouter.get('/:id', reviewController.reviewWrittenToUserId);

// write a review to the user identifiable by the provided ID
reviewRouter.post('/:id', reviewController.writeReviewToUserId);


module.exports = reviewRouter;