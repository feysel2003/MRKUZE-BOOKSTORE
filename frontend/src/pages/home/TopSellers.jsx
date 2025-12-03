import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

const categories = ["choose a genre", "Business", "Fiction", "Educational", "Adventure"]
const TopSellers = () => {
    const [books, setBooks] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState("Choose a genre")

    useEffect(() => {
        fetch("books.json")
        .then(res => res.json())
        .then((data) => setBooks(data))
    }, [])

    const filteredBooks = selectedCategory === "choose a genre" ? books: books.filter(book => book.category === selectedCategory.toLowerCase())

    console.log(filteredBooks);
  return (
    <div className='py-10'>
     <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
     {/* category filtering */}

     <div className='mb-8 flex items-center'>
        <select onChange={(e) => setSelectedCategory(e.target.value)}
        name="category"  id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
            {
                categories.map((category, index) => (
                    <option key={index} value={category}>

                    {category}
                    </option>
                ))
            }
        </select>
     </div>
   {
        filteredBooks.map((book, index) => (
            <BookCard key={index} book ={book}/>
        ))
    }

    </div>

  )
}

export default TopSellers