const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders, updateOrderStatus } = require('./order.controller');

const router = express.Router();

// create order endpoint
router.post("/",  createAOrder)

// get order by user email
router.get("/email/:email", getOrderByEmail);
// get all orders
router.get("/", getAllOrders); 

// Update order status (Patch is used for partial updates) ---
router.patch("/:id", updateOrderStatus);

module.exports = router;

// 