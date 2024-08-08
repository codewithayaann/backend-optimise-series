// payment.route.js
const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/payment');


router.post('/make-payment', PaymentController.makePayment);

module.exports = router;