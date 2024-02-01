const userModel = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config()
const { SECRET_KEY } = process.env;

const {
    isValidName,
    isValidEmail,
    isValid,
    isValidPassword,
  } = require("../Utils/validator");

// ===================Register====================================================================
const createUser = async function (req, res) {
  try {
      const data =req.body; 
      const { name, email, password ,confirmPassword} = data

    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "Name is required!" });
    if (!isValid(name) || !isValidName(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name is invalid" });
    }

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Email is required!" });
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email is invalid!" });
    }
    let userEmail = await userModel.findOne({ email: email });
    if (userEmail)
      return res.status(401).send({
        status: false,
        message:
          "This email address already exists, please enter a unique email address!",
      });

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password is required!" });
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be strong, please use one number, one upper case, one lower case and one special character and characters should be between 8 to 15 only!",
      });
    }

    // const salt = await bcrypt.genSalt(10);
    // data.password = await bcrypt.hash(data.password, salt);

    if (!confirmPassword)
    return res
      .status(400)
      .send({ status: false, message: "Password is required!" });
  if (!isValidPassword(confirmPassword)) {
    return res.status(400).send({
      status: false,
      message:
        "Password should be strong, please use one number, one upper case, one lower case and one special character and characters should be between 8 to 15 only!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  data.confirmPassword=await bcrypt.hash(data.confirmPassword,salt)


    const document = await userModel.create(data);
    return res.status(201).send({
      status: true,
      message: "user successfully created",
      data: document,
    });
  } catch (error) {
    res.status(500).send({ message:error.message});
  }
};

//==================logIn=====================================================================

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body
    if (!isValidEmail(email)) {
        return res.status(400).send({ status: false, message: "please enter email correctly" })
    }
    if (!password) {
        return res.status(400).send({ status: false, message: "please enter your password" })
    }
    const userData = await userModel.findOne({ email: email })
    if (!userData) {
        return res.status(400).send({ status: false, message: "please enter correct email" })
    }
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
        return res.status(400).send({ status: false, message: 'Please enter the correct password' });
    }
    let token = jwt.sign({id: userData._id},SECRET_KEY, { expiresIn: '24h' })
    if (!token) {
        return res.status(500).send({ status: false, message: "try again ..." })
    }
    return res.status(200).send({ status: true, message: "user login successfuly", data: { userId: userData._id, token: token } })


  } catch (err) {
    res.status(500).send({ staus: false, message: err.message });
  }
};

module.exports = { createUser, loginUser};