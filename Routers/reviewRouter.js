const express = require('express');
const reviewRouter = express.Router();
//const reviewController = require("../Controllers/reviewController");

reviewRouter.get('/', (req, res) => {
    res.render('reviewSystem');
});


module.exports = reviewRouter;