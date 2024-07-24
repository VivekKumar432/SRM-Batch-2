require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const adminRoutes = require("./routes/adminRoutes");

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("hello, world!");
});

const port = process.env.PORT || 4545;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

