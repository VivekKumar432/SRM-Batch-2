require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const adminRoutes = require('./routes/admin');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/',(req,res) => {
    res.send('hello,world!');
});


const port = process.env.PORT || 4545;
app.listen(port, console.log(`Listening on port ${port}...`));