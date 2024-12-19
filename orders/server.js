const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");

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
      CustomerID: new mongoose.Types.ObjectId(req.body.CustomerID),
      BookID: new mongoose.Types.ObjectId(req.body.BookID),
      initialDate: req.body.initialDate,
      deliveryDate: req.body.deliveryDate
    };

    const order = new Order(newOrder);
    await order.save();
    res.status(201).json({ message: "Order created successfully!" });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Error fetching orders");
  }
});

// Get order by ID
app.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send("Invalid Order");
    }

    const customerResponse = await axios.get(`http://localhost:5555/customer/${order.CustomerID}`);
    const bookResponse = await axios.get(`http://localhost:4545/book/${order.BookID}`);

    const orderObject = {
      customerName: customerResponse.data.name,
      bookTitle: bookResponse.data.title
    };

    res.json(orderObject);
  } catch (err) {
    console.error("Error fetching order:", err.message);
    res.status(500).send("Error fetching order details");
  }
});

// Start the server
app.listen(7777, () => {
  console.log("Up and running - Orders service");
});
