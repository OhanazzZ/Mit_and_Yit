const express = require('express');
const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController.js");

// get reviews written to the user identifiable by the provided ID (tested)
reviewRouter.get('/:id', reviewController.reviewWrittenToUserId);

// write a review to the user identifiable by the provided ID (tested)
reviewRouter.post('/:id', reviewController.writeReviewToUserId);

// modeify an existing review to the user identifiable by the provided ID (failed)
reviewRouter.patch('/:id', reviewController.updateReview);

module.exports = reviewRouter;