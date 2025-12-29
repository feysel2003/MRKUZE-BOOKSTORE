const express = require('express');
const router = express.Router();
const Book = require('./book.model');
// 1. Import postReview from controller
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook, postReview } = require("./book.controller");
const verifyAdminToken = require('../middleware/verifyAdminToken');
const os = require('os'); 

// --- INTERNAL ROUTE (With Load Balancing Logic) ---
router.get("/internal/stats", async (req, res) => {
    try {
        const containerID = os.hostname();
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
            servedBy: containerID
        });
    } catch (error) {
        console.error("Error fetching internal stats", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --- PUBLIC ROUTES ---

// get all books
router.get("/", getAllBooks)

// get single endpoint
router.get("/:id", getSingleBook)

// NEW: Post a review (Public endpoint, logic handles user data)
router.post("/:id/reviews", postReview);

// --- ADMIN PROTECTED ROUTES ---

// post a book
router.post("/create-book", verifyAdminToken, postABook)

// update book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook)

// delete book endpoint
router.delete("/:id", verifyAdminToken, deleteABook)

module.exports = router;