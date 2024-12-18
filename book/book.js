const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true },

    numberPage: { 
        type: Number, 
        required: false },

    publisher: { 
        type: String, 
        required: false }
});

mongoose.model("Book", bookSchema);
