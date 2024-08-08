const paymentsCollection = require('../models/payment')
const ordersCollection = require('../models/order')
const shipmentsCollection = require('../models/shipment')
const mongoose = require('mongoose');

class PaymentController {
    async makePayment(req, res) {
        const session = await mongoose.startSession();
        try {

            try {
                const userId = Math.ceil(Math.random() * 100);
                const amount = Math.random() * 100 * 10

                await session.startTransaction();


                // payment data save
                const payment = new paymentsCollection({ userId, amount, status: 'Completed' });
                const paymentResult = await payment.save({ session });

                // order create//
                const order = new ordersCollection({ userId, paymentId: paymentResult._id, items: ['item1', 'item2'], status: 'Created' });
                const orderResult = await order.save({ session });

                // Save the shipment document with the session
                const shipment = new shipmentsCollection({ orderId: null, status: 'Ready to Ship', shippingAddress: 'India' });
                await shipment.save({ session });


                await session.commitTransaction();

                return res.status(200).json({
                    message: 'Done'
                })
            } catch (error) {
                await session.abortTransaction();
                console.error('Error occurred', error);
                return res.status(500).json({
                    message: 'Error occurred'
                })
            } finally {
                await session.endSession();
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error occurred!'
            })
        }
    }
}

module.exports = new PaymentController()