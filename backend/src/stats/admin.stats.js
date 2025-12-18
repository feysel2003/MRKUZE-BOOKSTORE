const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Order = require("../orders/order.model");
const Book = require("../books/book.model");

// Function to calculate admin stats
router.get("/", async (req, res) => {
    try {
        // 1. Total numbers Of Orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (ONLY for 'completed' orders)
        const totalSales = await Order.aggregate([
            {
                $match: { status: 'completed' } // <--- FIX: Filter only completed orders
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 3. Trending books statistics:
        const trendingBooksCount = await Book.aggregate([
            { $match: { trending: true } },
            { $count: "trendingBookCount" }
        ]);
        
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBookCount : 0;

        // 4. Total number of books
        const totalBooks = await Book.countDocuments();

        // 5. Monthly sales (ONLY for 'completed' orders)
        const monthlySales = await Order.aggregate([
            {
                $match: { status: 'completed' } // <--- FIX: Filter only completed orders for the chart too
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, 
                    totalSales: { $sum: "$totalPrice" }, 
                    totalOrders: { $sum: 1 } 
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // 6. Get Last 5 Recent Orders
        const lastOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email totalPrice status createdAt'); // Added 'status' to see it in the list

        // Result summary
        res.status(200).json({
            totalOrders,
            totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,
            trendingBooks,
            totalBooks,
            monthlySales,
            lastOrders
        });

    } catch (error) {
        console.error("Error fetching admin stats: ", error);
        res.status(500).json({ message: "Failed to fetch admin stats" })
    }
})

module.exports = router;