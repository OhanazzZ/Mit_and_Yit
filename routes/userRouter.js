const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");


// registration 
userRouter.get("/signup", userController.signupRender);
userRouter.post("/signup", userController.signup);

// login Form
userRouter.get('/login', userController.loginRender);
userRouter.post('/login', userController.login);

// profile
userRouter.get('/profile', userController.ensureAuthenticated, userController.profile);

// edit profile
userRouter.get('/edit', userController.ensureAuthenticated, userController.editprofileRender);
userRouter.post('/edit', userController.ensureAuthenticated, userController.editProfile);

// logout
userRouter.get('/logout', userController.ensureAuthenticated, userController.logout);


module.exports = userRouter;