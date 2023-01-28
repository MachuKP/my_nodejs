const router = require('express').Router();
const productController = require('../controllers/products.js');

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.saveProduct);

module.exports = router;