const express = require('express');
const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController.js");

reviewRouter.get("/", reviewController.ensureAuthenticated, reviewController.reviewRender);

reviewRouter.get("/write", reviewController.ensureAuthenticated, reviewController.writeRender);
reviewRouter.post("/write", reviewController.ensureAuthenticated, reviewController.writeReview);

reviewRouter.get("/view", reviewController.ensureAuthenticated, reviewController.viewRender);



module.exports = reviewRouter;