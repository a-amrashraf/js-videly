const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../model/User");
const jwt = require("jsonwebtoken");



router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or password");

  const validPassword = await bcrypt.compare(req.body.password, User.password);
  if (!validPassword) return res.status(400).send("Invalid Email or password");


  const token = jwt.sign({ _id: user._id },"jwtPrivateKey");
  res.send(token);
});

function validate(req) {
  const Schema = Joi.object({
    email: Joi.string().email().required().email(),
    password: Joi.string().min(8).required(),
  });
  return Schema.validate(user);
}
module.exports = router;
