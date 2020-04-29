const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");


// get all users (tested)
userRouter.get("/info", userController.getAllUsers);

// get an user by id (tested)
userRouter.get("/info/:id", userController.getUserByID);

// modify an user's information by id (tested)
userRouter.patch("/info/:id", userController.updateUserByID);

// add an user (tested)
userRouter.post("/signup", userController.addUser);


module.exports = userRouter;