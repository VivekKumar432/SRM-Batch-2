// const router = require("express").Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const { v4: uuidv4 } = require("uuid");
const createUser = async (req, res) => {
  try {
    const validatedData = validate(req.body);
    // const {firstName, lastName} = validate(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });

    const user = await UserModel.findOne({ email: validatedData.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(validatedData.value.password, salt);

    UserModel.create({
      id: uuidv4(),
      firstName: validatedData.value.firstName,
      lastName: validatedData.value.lastName,
      email: validatedData.value.email,
      password: hashPassword,
    });

    // await new User({ ...req.body, password: hashPassword }).save();
    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const validate = (data) => {
  console.log(data);
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json("Email and password fields can not be empty");
  }
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          res.status(200).json({ message: "Success", token: token });
        } else {
          res.json("the password is incorrect");
        }
      });
    } else {
      res.json("No record existed");
    }
  });
};

module.exports = { createUser, loginUser };
