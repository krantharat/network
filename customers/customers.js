const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://tenniskrtrkyung:networkCustomer@cluster0.jamv5.mongodb.net/")
  .then(() => {
    console.log("Database connected - Customer");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


require("./customer");
const Customer = mongoose.model("Customer");

// Create customer
app.post("/customer", async (req, res) => {
  try {
    const newCustomer = {
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
    };

    const customer = new Customer(newCustomer);
    await customer.save();
    res.status(201).send("Customer created successfully");
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({ error: "Error creating customer", details: err.message });
  }
});

// Get all customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: "Error fetching customers" });
  }
});

// Get customer by ID
app.get("/customer/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.json(customer);
  } catch (err) {
    console.error("Error fetching customer:", err);
    res.status(500).json({ error: "Error fetching customer", details: err.message });
  }
});

// Delete customer by ID
app.delete("/customer/:id", async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send("Customer not found");
    }
    res.send("Customer deleted successfully");
  } catch (err) {
    console.error("Error deleting customer:", err);
    res.status(500).json({ error: "Error deleting customer", details: err.message });
  }
});

// Start the server
app.listen(5555, () => {
  console.log("Up and running - Customer service");
});
