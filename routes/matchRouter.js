const express = require('express');
const matchRouter = express.Router();
const matchController = require("../controllers/matchController.js");

// find matches for an user
matchRouter.get('/find/:id', matchController.findMatch);

// find matches for an user by cuisine
matchRouter.get('/find_cuisine/:id', matchController.ByCuisine);

// find matches for an user by availability
matchRouter.get('/find_availability/:id', matchController.ByAvailability);

module.exports = matchRouter;   