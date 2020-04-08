const express = require('express');
const usersRouter = express.Router();
const userController = require("../Controllers/userController");
//Route for GET method
//can also define app.post, app.delete, or other HTTP methods
usersRouter.get('/', (req, res) => {
    //return the response
    userController.getAllUsers(req, res);
});

//get user by cuisine
usersRouter.get('/:cuisine', (req, res) => {
    userController.getUserByCuisine(req, res);
});

//update
usersRouter.post('/:name', userController.updateCuisineByName);
usersRouter.patch('/', userController.addUser);

//export the router so that app.js can import it
module.exports = usersRouter;