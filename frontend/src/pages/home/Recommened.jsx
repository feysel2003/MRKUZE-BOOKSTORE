import React, { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import Loading from '../../components/Loading';

// Icons
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

const Recommened = () => {
  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  // Navigation State for Custom Buttons
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  useEffect(() => {
    if (books.length > 0) {
        //  Filter by 'Trending' flag ---
        // Instead of random shuffle, we show books marked as 'Trending' by Admin
        const trendingBooks = books.filter(book => book.trending === true);
        
        // Take the top 10 trending books
        setRecommendedBooks(trendingBooks.slice(0, 10));
    }
  }, [books]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching recommendations</div>;

  return (
    <div className='py-16 relative'> 
        
        <div className='flex justify-between items-center mb-6'>
            <h2 className='text-3xl font-semibold'>Recommended for you</h2>
        </div>
        
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            // Link navigation to the state variables
            navigation={{
                prevEl: prevEl,
                nextEl: nextEl,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                },
                1180: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                }
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper relative"
        >
            {recommendedBooks.length > 0 ? (
                recommendedBooks.map((book, index) => (
                    <SwiperSlide key={book._id || index}>
                        <BookCard book={book}/>
                    </SwiperSlide>
                ))
            ) : (
                <div className='text-gray-500'>No trending books available right now.</div>
            )}

            {/* --- CUSTOM BUTTONS OVERLAY --- */}
            
            {/* Prev Button */}
            <button 
                ref={(node) => setPrevEl(node)}
                className='absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 rounded-full bg-primary text-white hover:bg-blue-700 transition-all duration-200 shadow-lg focus:outline-none'
                aria-label="Previous Slide"
                style={{ marginLeft: '-10px' }} 
            >
                <HiOutlineArrowLeft className='size-6'/>
            </button>

            {/* Next Button */}
            <button 
                ref={(node) => setNextEl(node)}
                className='absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 rounded-full bg-primary text-white hover:bg-blue-700 transition-all duration-200 shadow-lg focus:outline-none'
                aria-label="Next Slide"
                style={{ marginRight: '-10px' }} 
            >
                <HiOutlineArrowRight className='size-6'/>
            </button>

        </Swiper>
    </div>
  )
}

export default Recommened;