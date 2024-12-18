const express = require("express");
const app = express();
const mongoose = require("mongoose");
 const bodyParser = require("body-parser")  

 app.use(bodyParser.json());

// app.use(bodyParser.json());
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://dadaphirada:Aida2004_@customerservice.5uijo.mongodb.net/mydatabase?retryWrites=true&w=majority&authSource=admin");

        console.log("Database connected - Customer Service");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};  
connectDB();   

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String
});
const Customer = mongoose.model("Customer", customerSchema);

app.post("/Cus_DB", (req, res) => {
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

app.get("/Cus_DB", (req, res) => {
    Customer.find().then((customer) => {
        res.json(customer)
    }).catch((err) => {
        if(err){
            throw err

        }
    })

})

app.get("/Cus_DB/:id", (req, res) => {
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

app.delete("/Cus_DB/:id", (req, res) => {
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

  