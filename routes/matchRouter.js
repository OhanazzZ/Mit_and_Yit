const express = require('express');
const matchRouter = express.Router();
const matchController = require("../controllers/matchController.js");

// find matches for an user (tested)
matchRouter.get('/:id', matchController.findMatch);

// find matches for an user by cuisine (tested)
matchRouter.get('/find_cuisine/:id', matchController.ByCuisine);

// find matches for an user by availability (tested)
matchRouter.get('/find_availability/:id', matchController.ByAvailability);

module.exports = matchRouter;   