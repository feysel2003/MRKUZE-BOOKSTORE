const express = require('express');
const router = express.Router();
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require("./book.controller");
const verifyAdminToken = require('../middleware/verifyAdminToken');
const os = require('os'); // <--- 1. IMPORT OS MODULE

// --- INTERNAL ROUTE (With Load Balancing Logic) ---
router.get("/internal/stats", async (req, res) => {
    try {
        // 2. Get the Container ID (Hostname)
        const containerID = os.hostname();
        
        // 3. Log it so we can see which replica handled the request in the terminal
        console.log(`[LOAD BALANCING] Request handled by Container ID: ${containerID}`);

        const totalBooks = await Book.countDocuments();
        
        const trendingCount = await Book.aggregate([
            { $match: { trending: true } },
            { $count: "trendingBookCount" }
        ]);
        const trendingBooks = trendingCount.length > 0 ? trendingCount[0].trendingBookCount : 0;

        res.status(200).json({
            totalBooks,
            trendingBooks,
            servedBy: containerID // Send ID back (Optional, for debugging)
        });
    } catch (error) {
        console.error("Error fetching internal stats", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --- EXISTING ROUTES ---

// post a book
router.post("/create-book", verifyAdminToken, postABook)

// get all books
router.get("/", getAllBooks)

// get single endpoint
router.get("/:id", getSingleBook)

// update book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook)

// delete book endpoint
router.delete("/:id", verifyAdminToken, deleteABook)

module.exports = router;