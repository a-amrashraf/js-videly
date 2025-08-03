const express = require("express");

const Joi = require("joi");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const names = [
  {
    id: 1,
    name: "name1",
  },
  {
    id: 2,
    name: "name2",
  },
  {
    id: 3,
    name: "name3",
  },
  {
    id: 4,
    name: "name4",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/names", (req, res) => {
  res.send(names);
});

app.get("/api/names/:id", (req, res) => {
  let name = names.find((name) => name.id === parseInt(req.params.id));
  if (!name) {
    {
      return res.status(404).send("The name with the given ID was not found");
    }
  } else {
    res.send(name);
  }
});
//post
app.post("/api/names", (req, res) => {
  const { error } = ValidateName(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const name = {
    id: names.length + 1,
    name: req.body.name,
  };
  names.push(name);
  res.send(name);
});
//put
app.put("/api/names/:id", (req, res) => {
  const name = names.find((n) => n.id === parseInt(req.params.id));
  if (!name) {
    return res.status(404).send("The name with the given ID was not found");
  }

  const { error } = ValidateName(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  name.name = req.body.name;
  res.send(name);
});

app.delete("/api/names/:id", (req, res) => {
  const name = names.find((n) => n.id === parseInt(req.params.id));
  if (!name) {
    return res.status(404).send("The name with the given ID was not found");
  }

  const index = names.indexOf(name);
  names.splice(index, 1);

  res.send(name);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

function ValidateName(name) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(name);
}
