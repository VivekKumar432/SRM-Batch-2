const AdminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const { v4: uuidv4 } = require("uuid");

const createAdmin = async (req, res) => {
  try {
    const { error, value: validatedData } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await AdminModel.findOne({ email: validatedData.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "Admin with given email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(validatedData.password, salt);

    await AdminModel.create({
      id: uuidv4(),
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashPassword,
    });

    return res.status(201).send({ message: "Admin created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password fields cannot be empty" });
    }

    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No record existed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "The password is incorrect" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWTPRIVATEKEY, {
      expiresIn: "1d",
    });

    await res.cookie("token", token);
    return res.status(200).json({ message: "Success", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createAdmin, loginAdmin };
