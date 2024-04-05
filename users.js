const mongoose = require("mongoose");

// Define users schema
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create users model
const note = mongoose.model("user", userschema);

module.exports = note;
