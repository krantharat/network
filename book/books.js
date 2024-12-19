const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://tenniskrtrkyung:network@cluster0.8r3vy.mongodb.net/")
  .then(() => {
    console.log("Database connected - Books");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

require("./book");
const Book = mongoose.model("Book");


app.get('/', (req, res) => {
    res.send("This is the book service");
});

//add new book
app.post("/book", async (req, res) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPage: req.body.numberPage,
        publisher: req.body.publisher,
    };

    const book = new Book(newBook);

    try {
        await book.save();
        console.log("New book created");
        res.status(201).send("New book added successfully");
    } catch (err) {
        console.error("Error creating book:", err);
        res.status(500).send({ error: err.message });
    }
});

//get all books
app.get("/books", (req, res) => {

  Book.find().then((books) => {
      res.json(books)
  }).catch((err) => {
      if(err){
          throw err
      }
  })
})

app.get("/book/:id", (req, res) => {

  Book.findById(req.params.id).then((book) => {
        if(book){
          res.json(book)
        }else{
          res.sendStatus(404);
        }
      
  }).catch((err) => {
      if(err){
          throw err
      }
  })
})

app.delete("/book/:id", (req, res) => {

  Book.findOneAndDelete(req.params.id).then(() => {
      res.send("removed book success")
  }).catch((err) => {
      if(err){
          throw err
      }
  })
})

app.listen(4545, () => {
    console.log("Up and Running -- books service");
});
