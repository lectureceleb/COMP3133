const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8081;
const MONGODB_URI = process.env.MONGODB_URI || "";

mongoose.connect(MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log("MongoDB connected successfully.");
});
mongoose.connection.on('error', () => {
  console.log("Error connecting to MongoDB.");
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, city, website, zipcode, phone } = req.body;
    const newUser = new User({
      username,
      email,
      city,
      website,
      zipcode,
      phone
    });
    await newUser.save();
    res.json({ Message: "User successfully created" });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).send({
        errors
      });
    } else {
      res.status(500).send({
        "Message": "Something went wrong"
      });
    }

  }

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});