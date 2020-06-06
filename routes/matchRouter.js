const express = require('express');
const matchRouter = express.Router();
const matchController = require("../controllers/matchController.js");


matchRouter.get("/", matchController.ensureAuthenticated, matchController.matchRender);

//receive match result, display result and when like button is clicked, send http request 
matchRouter.post("/result", matchController.ensureAuthenticated, matchController.findMatch)

matchRouter.get("/find", matchController.ensureAuthenticated, matchController.matchFindRender);

matchRouter.get('/history', matchController.ensureAuthenticated, matchController.matchHistoryRender);

matchRouter.get('/request', matchController.ensureAuthenticated, matchController.matchRequestRender);

matchRouter.post('/like', matchController.ensureAuthenticated, matchController.matchRequest);
matchRouter.post('/accept', matchController.ensureAuthenticated, matchController.requestAccept);
matchRouter.post('/reject', matchController.ensureAuthenticated, matchController.requestReject);


module.exports = matchRouter;   
