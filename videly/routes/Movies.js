const { Movie, ValidateMovie } = require("../model/Movie");

const { Genre } = require("../model/Genre");

const mongoose = require("mongoose");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort("name");
    res.send(movies);
  } catch (error) {
    res.status(500).send("Error fetching movies: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid movie ID format");
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found");
    res.send(movie);
  } catch (error) {
    res.status(500).send("Error fetching movie: " + error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = ValidateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!mongoose.Types.ObjectId.isValid(req.body.genreId)) {
      return res.status(400).send("Invalid genre ID format");
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre");

    let movie = new Movie({
      name: req.body.name,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    
    movie = await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send("Error creating movie: " + error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = ValidateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid movie ID format");
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.genreId)) {
      return res.status(400).send("Invalid genre ID format");
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre");

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name, // Fixed: was 'title', now 'name'
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      { new: true }
    );
    
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found");
    res.send(movie);
  } catch (error) {
    res.status(500).send("Error updating movie: " + error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid movie ID format");
    }

    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found");
    res.send(movie);
  } catch (error) {
    res.status(500).send("Error deleting movie: " + error.message);
  }
});

module.exports = router;