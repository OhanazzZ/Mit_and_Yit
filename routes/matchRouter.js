const express = require('express');
const matchRouter = express.Router();
const matchController = require("../controllers/matchController.js");

// find matches for an user by user id
matchRouter.get('/find/:id', matchController.findMatch)

module.exports = matchRouter;