// Node.js backend example using Razorpay
const Razorpay = require('razorpay');
const express = require('express');
const app = express();

app.post('/create-order', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: 'YOUR_RAZORPAY_KEY_ID',
        key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
    });

    const options = {
        amount: 50000,  // Amount in paise (50000 paise = 500 INR)
        currency: 'INR',
        receipt: 'order_rcptid_11'
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);  // Send the order details to the frontend
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
