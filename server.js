const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const { mongoDBPassword } = require("./password.js");



app.get("/", (req, res) => {
    res.send("Welcome to my MongoAPI")
})

app.post("/blogpost", (req, res) => {
    res.send("This is a postrequest")
})





mongoose.
connect("mongodb+srv://hijaker:${mongoDBPassword}@cluster0.phpb6.mongodb.net/Products-API?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log("Listening on 3000");
    });
})