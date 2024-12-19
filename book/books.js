const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://tenniskrtrkyung:network@cluster0.8r3vy.mongodb.net/")
  .then(() => console.log("Database connected - Books"))
  .catch((err) => console.error("Database connection error:", err));

require("./book");
const Book = mongoose.model("Book");


app.get("/", (req, res) => {
  res.send("This is the book service");
});

// Add a new book
app.post("/book", async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      numberPage: req.body.numberPage,
      publisher: req.body.publisher,
    };

    const book = new Book(newBook);
    await book.save();

    res.status(201).json({ message: "New book added successfully", book });
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ error: "Error creating book", details: err.message });
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// Get a book by ID
app.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Error fetching book", details: err.message });
  }
});

// Delete a book by ID
app.delete("/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book removed successfully", book });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Error deleting book", details: err.message });
  }
});

// Start the server
app.listen(4545, () => {
  console.log("Up and Running -- Books service");
});
