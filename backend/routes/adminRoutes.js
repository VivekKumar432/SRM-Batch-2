const express = require("express");
const { createAdmin, loginAdmin } = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/create-admin", createAdmin);
adminRouter.post("/login-admin", loginAdmin);

module.exports = adminRouter;
