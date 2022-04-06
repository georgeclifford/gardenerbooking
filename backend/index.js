const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(fileUpload());

//middleware

app.use(express.json());//req.body
app.use(cors());

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () =>{
    console.log("server is running on port 5000");
});

// image route
app.use('/images', express.static(path.join(__dirname, '/images')));