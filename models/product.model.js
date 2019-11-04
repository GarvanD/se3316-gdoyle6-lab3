const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    loan_period: {type: Number, required: true},
    type: {type: String, required:true},
    quantity: {type: Number, required:true}
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);