const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const AdminModel = require('./models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())


mongoose.connect("mongodb://localhost:27017/employee");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token was not available")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json("Token is wrong")
            next();
        })
    }
}

app.get('/home', verifyUser, (req, res) => {
    return res.json("Success")
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.json("Email and password fields can not be empty");
    }
    EmployeeModel.findOne({email: email})
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn: "1d"})
                        res.cookie("token", token);
                        res.json({message: "Success", token: token});
                    } else {
                        res.json("the password is incorrect")
                    }
                })
            } else {
                res.json("No record existed")
            }
        })
})

app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.json("Email and password fields can not be empty");
    }
    AdminModel.findOne({ email: email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn: "1d"})
                    res.cookie("token", token);
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
                }
            })
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    if(!email || !password) {
        return res.json("Email and password fields can not be empty");
    }
    bcrypt.hash(password, 10)
        .then(hash => {
            EmployeeModel.create({ name, email, password: hash })
                .then(employees => { res.json(employees) })
                .catch(err => res.json(err))
        }).catch(err => console.log(err.message))
})

app.post('/admin', (req, res) => {
    const {name, email, password} = req.body;
    if(!email || !password) {
        return res.json("Email and password fields can not be empty");
    }
    bcrypt.hash(password, 10)
        .then(hash => {
            AdminModel.create({ name, email, password: hash })
                .then(admins => { res.json(admins) })
                .catch(err => res.json(err))
        }).catch(err => console.log(err.message))
})

app.listen(3001, () => {
    console.log("server is running")
})
