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

// get All books

const getAllBooks = async (req, res) =>{
try {
  const books = await Book.find().sort({ creatAt: -1});

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

const deleteABook = async (req, res) => {

} 
module.exports = { 
    postABook,
 getAllBooks,
 getSingleBook,
 UpdateBook,
 deleteABook
};