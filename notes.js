const mongoose = require('mongoose');

// Defining the note schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,

    },
    content: {
        type: String,
        require: true,

    }
});

// Create Notes model
const note = mongoose.model("note", noteSchema);

module.exports = note;