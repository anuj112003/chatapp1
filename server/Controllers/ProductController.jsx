const ProductModel = require('../Models/ProductModel')

const express = require('express');
const router = express.Router();

// Get Products in API - /products
router.get('/products', async (req, res, next) => {
    //search filter
    const quary = req.query.keyword?{name:{
        $regex : req.query.keyword,
        $options : 'i'
    }}:{}
    //find the product
    const Products = await ProductModel.find(quary);
    //get all products
    res.json({
        success: true,
        Products
    });
})

// Get SIngle Product in API - /products/:id
router.get('/product/:id', async (req, res, next) => {
    try {
        // get a single product by id
        const product = await ProductModel.findById(req.params.id);
        // Logic to find product by id
        res.json({
            success: true,
            product
        })
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;
