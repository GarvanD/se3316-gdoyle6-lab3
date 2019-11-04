// app.js
const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products
const router = express.Router();
// initialize our express app
const app = express();
const uri = "mongodb+srv://Garv:TopSecret@lab3-se3316-xvsqk.mongodb.net/Library?retryWrites=true&w=majority";
//use your own URI from mongoDB atlas
// --------------------------------------------
// DB connect code for 'mongoose' package
const mongoose = require('mongoose');
mongoose.connect(uri, {
  useNewUrlParser: true,
});



console.log('Connected to the database (mongoose)')
// --------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.use('/',express.static('front_end'));


let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);});
