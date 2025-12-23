const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Order = require("../orders/order.model");
const axios = require('axios'); // Needed to talk to Product Service

// Function to calculate admin stats
router.get("/", async (req, res) => {
    try {
        // --- LOCAL DATA (From Order Database) ---

        // 1. Total numbers Of Orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (ONLY for 'completed' orders)
        const totalSalesResult = await Order.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }
        ]);
        const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

        // 3. Monthly sales (ONLY for 'completed' orders)
        const monthlySales = await Order.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, 
                    totalSales: { $sum: "$totalPrice" }, 
                    totalOrders: { $sum: 1 } 
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // 4. Get Last 5 Recent Orders
        const lastOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email totalPrice status createdAt');

        // --- DISTRIBUTED DATA (Fetch from Product Service) ---
        
        let totalBooks = 0;
        let trendingBooks = 0;

        try {
            // We communicate via HTTP inside the Docker network
            // 'product-service' is the container name defined in docker-compose
            const response = await axios.get('http://product-service:5002/internal/stats');
            
            totalBooks = response.data.totalBooks;
            trendingBooks = response.data.trendingBooks;
            
        } catch (error) {
            console.error("Failed to fetch stats from Product Service:", error.message);
            // If Product Service is down, we default to 0 to keep the dashboard working
        }

        // Result summary
        res.status(200).json({
            totalOrders,
            totalSales,
            trendingBooks, // Now coming from Product Service
            totalBooks,    // Now coming from Product Service
            monthlySales,
            lastOrders
        });

    } catch (error) {
        console.error("Error fetching admin stats: ", error);
        res.status(500).json({ message: "Failed to fetch admin stats" })
    }
})

module.exports = router;