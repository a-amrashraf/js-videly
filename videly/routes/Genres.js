const express = require("express");

const mongoose = require("mongoose");

const router = express.Router();

const { Genre, ValidateGenre } = require("../model/Genre");


router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (error) {
    res.status(500).send("Error fetching genres: " + error.message);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).send("The genre with the given ID was not found");
    }
    res.send(genre);
  } catch (error) {
    res.status(500).send("Error fetching genre: " + error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = ValidateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  try {
    const genre = new Genre({
      name: req.body.name,
      description: req.body.description
    });
    const savedGenre = await genre.save();
    res.send(savedGenre);
  } catch (error) {
    res.status(500).send("Error creating genre: " + error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = ValidateGenre(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, description: req.body.description },
      { new: true, runValidators: true }
    );

    if (!genre) {
      return res.status(404).send("The genre with the given ID was not found");
    }

    res.send(genre);
  } catch (error) {
    res.status(500).send("Error updating genre: " + error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    
    if (!genre) {
      return res.status(404).send("The genre with the given ID was not found");
    }

    res.send(genre);
  } catch (error) {
    res.status(500).send("Error deleting genre: " + error.message);
  }
});



module.exports = router;