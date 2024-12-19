const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")  

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://tenniskrtrkyung:networkCustomer@cluster0.jamv5.mongodb.net/")
  .then(() => {
    console.log("Database connected - Customer");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


require("./customer");
const Customer = mongoose.model("Customer");

//create customer
app.post("/customer", (req, res) => {
    const newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    const customer = new Customer(newCustomer);
    
    customer.save()
        .then(() => {
            res.send("Customer Created");
        })
        .catch((err) => {
            console.error("Error creating customer:", err);
            res.status(500).send("Error creating customer");
        });
});

//get all customer
app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((err) => {
        if(err){
            throw err
        }
    })

})

//get customer by id
app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if(customer){        
            res.json(customer)
        } else {
            res.send("invalid ID")
        }
    }).catch((err) => {
        if(err){
            throw err

        }
    })

})

app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id).then(() => {
            res.send("Customer deleted with success")
    }).catch((err) => {
        if(err){
            throw err
        }
    })

})

app.listen(5555, () => {
    console.log("up and running - Customer service");
});

  