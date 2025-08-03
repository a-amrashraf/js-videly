const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const userSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

function validateUser(user) {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required().email(),
    password: Joi.string().min(8).required(),
  });
  return Schema.validate(user);
}

const User = mongoose.model("User", userSchmea);

exports.User = User;
exports.validateUser = validateUser;
