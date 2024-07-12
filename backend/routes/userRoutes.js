const express = require("express");
const createUser = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/create-user", createUser);

module.exports = userRouter;
