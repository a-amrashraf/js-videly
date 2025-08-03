const Joi = require("joi");

const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
  description: String,
});

const Genre = mongoose.model("Genre", genreSchema);


function ValidateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3),
  });

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.ValidateGenre = ValidateGenre;
exports.genreSchema = genreSchema;

