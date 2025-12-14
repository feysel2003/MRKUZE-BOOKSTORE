const express = require('express');
const router = express.Router();
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require("./book.controller");
const verifyAdminToken = require('../middleware/verifyAdminToken');

// frontEnd => backend => controller => book schema => database => send to server => back to frontEnd
//post = when submit something frontend to db
// get = when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a book

router.post("/create-book", verifyAdminToken, postABook)

// get all books
router.get("/", getAllBooks)

// get sigle endpoint

router.get("/:id", getSingleBook)

// update book endpoint

router.put("/edit/:id", verifyAdminToken, UpdateBook)

router.delete("/", verifyAdminToken, deleteABook)

module.exports = router;
