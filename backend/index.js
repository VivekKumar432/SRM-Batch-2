const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const AdminModel = require('./models/Admin')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee");

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post("/admin/login", (req,res) => {
    const {email, password} = req.body;
    AdminModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/admin', (req, res) => {  
    AdminModel.create(req.body)
    .then(admins => res.json(admins))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})