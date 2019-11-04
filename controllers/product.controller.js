const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send(req.body.toString());
};

exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            loan_period: req.body.loan_period,
            type: req.body.type,
            quantity: req.body.quantity
        }
    );
    product.save(function (err) {
        if (err) {
            res.send('Product Created unsuccessfully')
            console.log (err);
        }
        res.send('Product Created successfully')
    })
}

exports.product_details = function (req,res) {
Product.findById(req.params.id, function (err, product) {
        if (err) return console.log(err);
        res.send(product);
    })
}

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return console.log(err);
        res.send('Product updated.');
    });
};


exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return console.log(err);
        res.send('Deleted successfully!');
    })
};

exports.product_get_all = function(req,res){
    Product.find(function(err,product){
        if (err) return console.log(err);
        res.send(product)
    })
};
