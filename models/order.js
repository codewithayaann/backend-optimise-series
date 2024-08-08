// orders.schema.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    items: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['Created', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Created'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);