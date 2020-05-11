const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");


// get all users (tested)
userRouter.get("/info", userController.getAllUsers);

// get a user by id (tested)
userRouter.get("/info/:id", userController.getUserByID);

// modify a user's information by id (tested)
userRouter.patch("/info/:id", userController.updateUserByID);

// add a user (tested)

userRouter.get("/signup", (req, res) => {
    res.render('signup');
});

userRouter.post("/signup", userController.addUser);


module.exports = userRouter;
