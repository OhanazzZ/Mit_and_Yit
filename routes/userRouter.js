const express = require("express");

// create router
const userRouter = express.Router();

// load/import the user controller
const userController = require("../controllers/userController.js");


// handle the GET request to get all users
userRouter.get("/info", userController.getAllUsers);

// handle the GET request to get an user by ID
userRouter.get("/info/:id", userController.getUserByID);

// handle the PATCH request to update an user
userRouter.patch("/info/:id", userController.updateUser);

// handle the POST request to add an user
userRouter.post("/signup", userController.addUser);

// export the router
module.exports = userRouter;
