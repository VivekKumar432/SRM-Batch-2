require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// database connection
connection();

// middlewares
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));

// routes
app.use("/api/users", userRoutes);

app.use('/api/admin', adminRoutes);

app.get('/',(req,res) => {
    res.send('hello,world!');
});


app.use("/api/admin", adminRoutes);


const port = process.env.PORT || 4545;
app.listen(port, console.log(`Listening on port ${port}...`));
