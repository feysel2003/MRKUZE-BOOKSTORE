const express = require('express')
const router = express.Router();
const Book = require('./book.model')

router.post("/create-book", async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook});
    } catch (error) {
        console.error("Error creating Book", error);
        res.status(500).send({message: "Failed to create book"})
    }
})

module.exports = router;
