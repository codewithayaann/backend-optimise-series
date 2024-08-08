// shipments.model.js
const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    status: {
        type: String,
        enum: ['Ready to Ship', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Ready to Ship'
    },
    shippingAddress: {
        type: String,
        required: true
    },
    shippingMethod: {
        type: String,
        required: false
    },
    trackingNumber: {
        type: String
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

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;