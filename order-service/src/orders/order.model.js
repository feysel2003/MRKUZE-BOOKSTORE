const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        country: String,
        state: String,
        zipcode: String
    },
    phone: {
        type: Number,
        required: true,
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    // --- NEW FIELDS ADDED ---
    paymentMethod: {
        type: String,
        enum: ['cod', 'bank', 'card'], // Must match the values sent from frontend
        default: 'cod',
        required: true
    },
    paymentProof: {
        type: String, // URL string for the screenshot
        required: false 
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;