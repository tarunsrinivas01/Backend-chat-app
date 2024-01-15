const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

function isstringvalidate(string) {
  if (string == undefined || string.length === 0) return true;
  return false;
}
function generatetoken(id) {
  return jwt.sign({ userid: id }, "Tarun@123");
}

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(req.body);
    console.log(email);
    if (isstringvalidate(email) || isstringvalidate(password)) {
      return res.status(401).json({ err: "something is missing" });
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      try {
        const newUser = new User({
          email: email,
          userName: userName,
          password: hash,
        });
        await newUser.save();
        res
          .status(201)
          .json({ message: "successfully new user created", success: "true" });
      } catch (err) {
        res.status(500).json({
          message: err,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (isstringvalidate(email) || isstringvalidate(password)) {
      return res.status(401).json({ message: "something is missing" });
    }
    const users = await User.find({ email: email });
    if (users.length) {
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: err });
        }
        if (result) {
          console.log(generatetoken(users[0].id));
          return res
            .status(201)
            .json({
              message: "user logged in",
              token: generatetoken(users[0].email),
            });
        } else {
          return res.status(401).json({ message: "password incorrect" });
        }
      });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

exports.getUsers = (req, res) => {
  try {
    const user = req.user;

    const allUsers = User.find({ email: { $ne: email } });

    if (allUsers > 0) {
      res.status(201).json({ allUsers: allUsers });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
