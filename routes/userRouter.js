const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");


// get all users
userRouter.get("/info", userController.getAllUsers);

// get an user by id
userRouter.get("/info/:id", userController.getUserByID);

// modify an user's information by id
userRouter.patch("/info/:id", userController.updateUserByID);

// add an user
userRouter.post("/signup", userController.addUser);


module.exports = userRouter;
