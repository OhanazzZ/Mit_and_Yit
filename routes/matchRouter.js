const express = require('express');
const matchRouter = express.Router();
const matchController = require("../controllers/matchController.js");

// find matches for a user (tested)
matchRouter.get('/:id', matchController.findMatch);

// find matches for a user by cuisine (tested)
matchRouter.get('/find_cuisine/:id', matchController.ByCuisine);

// find matches for a user by availability (tested)
matchRouter.get('/find_availability/:id', matchController.ByAvailability);

module.exports = matchRouter;   
