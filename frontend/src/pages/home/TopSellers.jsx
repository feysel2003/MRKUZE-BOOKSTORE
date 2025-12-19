import React, { useState } from 'react'
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
// Import hooks
import { useSearchParams, useNavigate } from 'react-router-dom';

const categories = ["choose a genre", "Business", "Fiction", "Educational", "Adventure"]

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("choose a genre");
    
    // 1. Get search params
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || ""; 
    const navigate = useNavigate();

    const { data: books = [] } = useFetchAllBooksQuery();

    const filteredBooks = books.filter(book => {
        const categoryMatch = selectedCategory === "choose a genre" 
            ? true 
            : book.category === selectedCategory.toLowerCase();

        const searchMatch = searchQuery 
            ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) 
            : true;

        return categoryMatch && searchMatch;
    });

    // 2. Function to clear search
    const handleClearSearch = () => {
        navigate('/'); // This removes ?search=... from URL
    }

    return (
        // 3. Add ID here for the Navbar scroll logic
        <div className='py-10' id="books-section">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className='text-3xl font-semibold'>Top Sellers</h2>
                
                {/* 4. Show Reset Button if searching */}
                {searchQuery && (
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <p className="text-gray-500">
                            Result for: <span className="font-bold text-primary">"{searchQuery}"</span>
                        </p>
                        <button 
                            onClick={handleClearSearch}
                            className="bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600 transition"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>

            <div className='mb-8 flex items-center'>
                <select 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" 
                    id="category" 
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {filteredBooks.length > 0 ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 40 },
                        1024: { slidesPerView: 2, spaceBetween: 50 },
                        1180: { slidesPerView: 3, spaceBetween: 50 }
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="text-center py-20 text-gray-500 flex flex-col items-center">
                    <p className="text-xl mb-4">No books found matching your search.</p>
                    <button 
                        onClick={handleClearSearch}
                        className="text-blue-500 underline"
                    >
                        View all books
                    </button>
                </div>
            )}
        </div>
    )
}

export default TopSellers