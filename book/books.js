const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

require("./book"); // Ensure this file path is correct
const Book = mongoose.model("Book");

(async () => {
    try {
        await mongoose.connect("mongodb+srv://tenniskrtrkyung:network@cluster0.8r3vy.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database is connected");
    } catch (error) {
        console.log("Database connection error:", error);
    }
})();

app.get('/', (req, res) => {
    res.send("This is the book service");
});

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

app.get("/books", (req, res) => {

  Book.find().then((books) => {
      res.json(books)
  }).catch((err) => {
      if(err){
          throw err
      }
  })
})

app.get("/books/:id", (req, res) => {

  Book.findById().then((books) => {
      res.send(req.params.id).then((book) => {
        if(book){
          res.json(book)
        }else{
          res.sendStatus(404);
        }
      })
  }).catch((err) => {
      if(err){
          throw err
      }
  })
})

app.delete("/books/:id", (req, res) => {

  Book.findOneAndDelete(req.params.id).then(() => {
      res.send("removed book success")
  }).catch((err) => {
      if(err){
          throw err
      }
  })
})

app.listen(4545, () => {
    console.log("Up and Running -- This is our books service");
});
