const Book = require("./book.model");

const postABook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook});
    } catch (error) {
        console.error("Error creating Book", error);
        res.status(500).send({message: "Failed to create book"})
    }
};

// get All books (With Search)
const getAllBooks = async (req, res) =>{
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = { 
                title: { $regex: search, $options: 'i' } 
            };
        }
        const books = await Book.find(query).sort({ createdAt: -1});
        res.status(200).send(books)
        
    } catch (error) {
        console.error("Error fetching Books", error);
        res.status(500).send({message: "Failed to fetch book"})
    }
}

// get single book
const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if(!book){
            res.status(404).send({message: "Book not found!"});
        }
        res.status(200).send(book)
        
    } catch (error) {
        console.error("Error fetching Books", error);
        res.status(500).send({message: "Failed to fetch book"})
    }
}

// update Book Data
const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})

        if(!updatedBook){
            res.status(404).send({message: "Book is not Found!"});
        }

        res.status(200).send({
            message: "Updated Successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error Updating a Book", error);
        res.status(500).send({message: "Failed to update a book"})
    }
}

// delete book logic
const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).send({ message: "Book is not Found!" });
        }

        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        console.error("Error deleting a Book", error);
        res.status(500).send({ message: "Failed to delete a book" });
    }
}

// --- NEW: Post a Review ---
const postReview = async (req, res) => {
    try {
        const { id } = req.params; // Book ID
        const { comment, rating, userId, userName } = req.body;

        const book = await Book.findById(id);

        if(!book) {
            return res.status(404).send({message: "Book not found!"});
        }

        // Create review object
        const newReview = {
            userId,
            userName,
            comment,
            rating: Number(rating)
        };

        // Add to array and save
        book.reviews.push(newReview);
        await book.save();

        res.status(200).send({
            message: "Review posted successfully",
            book: book
        });

    } catch (error) {
        console.error("Error posting review", error);
        res.status(500).send({message: "Failed to post review"});
    }
}

module.exports = { 
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook,
    postReview // <--- Don't forget to export it!
};