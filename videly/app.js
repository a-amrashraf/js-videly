const express = require("express");

const genres = require("./routes/genres");

const connectDb = require("./config/db");

const Customer = require("./routes/Customers");

const movies = require("./routes/Movies");

const rentals = require("./routes/Rentals");

const users = require("./routes/Users");

const port = process.env.PORT || 5000;

const app = express();

const morgan = require("morgan");



app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/genres", genres);
app.use("/api/customers", Customer);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

console.log("mongo");
connectDb();
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
