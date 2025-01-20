require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const Product = require("./Models/productModel.js")
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to my MongoAPI")
})

app.post("/blogpost", (req, res) => {
    res.send("This is a postrequest")
})

app.post("/api/product", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(404);
    }
});

app.get("/api/Products", async(req, res) => {
try {
    const products = await Product.find({});
    res.status(200).json(products);
} catch (error) {
    res.status(500).json({message:error.message});
}
});

app.get("/api/product/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

app.put("/api/product/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(400).json({message: "Products does not exist"});
        }
    res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

app.delete("/api/product/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(400).json({message: "Products does not exist"});
        }
        res.status(200).json({message: "Item was deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

mongoose.
connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log("Listening on 3000");
    });
})
