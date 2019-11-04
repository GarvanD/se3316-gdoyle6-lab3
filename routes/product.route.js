const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// 
router.delete('/:id/delete', product_controller.product_delete);
router.put('/:id/update', product_controller.product_update);
router.post('/create',product_controller.product_create);
router.get('/:id',product_controller.product_details);
router.get('/',product_controller.product_get_all);
module.exports = router;