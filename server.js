// app.js
const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products
// initialize our express app
const app = express();
const uri = "mongodb+srv://Garv:<TopSecret>@lab3-se3316-xvsqk.mongodb.net/test?retryWrites=true&w=majority";
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
let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);});
