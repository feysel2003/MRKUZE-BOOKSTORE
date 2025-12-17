const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders } = require('./order.controller');

const router = express.Router();

// create order endpoint
router.post("/",  createAOrder)

// get order by user email
router.get("/email/:email", getOrderByEmail);
// get all orders
router.get("/", getAllOrders); 

module.exports = router;

// 