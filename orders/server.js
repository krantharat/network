const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://patchnida2547:patchnida2547@cluster0.cixex.mongodb.net/")
  .then(() => {
    console.log("Database connected - Orders");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Import the Order model
require("./Order");
const Order = mongoose.model("Order");

// Create a new order
app.post("/order", async (req, res) => {
  try {
    const newOrder = {
      CustomerID: new mongoose.Types.ObjectId(req.body.customerID),
      BookID: new mongoose.Types.ObjectId(req.body.BookID),
      initialDate: req.body.initialDate,
      deliveryDate: req.body.deliveryDate,
    };

    const order = new Order(newOrder);
    await order.save();

    console.log("Order Created successfully!");
    res.status(201).json({ message: "Order created successfully!" });


  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
});

app.get("/orders", (req, res) => {
    Order.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

// Start the server
app.listen(7777, () => {
  console.log("Up and running - Orders service");
});