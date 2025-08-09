const express = require("express");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const router = express.Router();

const { User, validateUser } = require("../model/User");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (await User.findOne({ email: req.body.email }))
    return res.status(400).send("User already registered");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = User.generateAuthToken();
  res.header('x-auth-token',token ).send(user);
});

module.exports = router;
