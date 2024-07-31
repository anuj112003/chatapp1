const express = require('express');
const router = express.Router();
const productModel = require('../Models/ProductModel')

// import model
const orderModel = require('../Models/OrderModel');

router.post('/orders', async (req, res, next) => {
    // To check - console.log(req.body, 'data')

    try {
        // Create order - /orders
        const cartItems = req.body;

        // // Calculate total amount
        // // reduce is help to add the total array(price)
        // // 0 - initial value, accumulation helps get the previous added value
        // // Number().toFixed(2) - 2 decimal digits
        const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
        console.log(amount,"amount")
        const status = 'pending';
        
        const order = await orderModel.create({ cartItems, amount, status });

        //updating stock
        cartItems.forEach(async(item) => {
            const product = await productModel.findById(item.product._id);
            product.stock=product.stock - item.qty;
            await product.save();
        });

        res.json({
            success: true,
            order
        });
    } 
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;
