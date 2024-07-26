const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login-user", loginUser);

module.exports = userRouter;
