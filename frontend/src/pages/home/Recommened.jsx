import React, { useEffect, useState } from 'react'

// import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import Loading from '../../components/Loading'; // Ensure you have this component

const Recommened = () => {
  // 1. Destructure isLoading and isError for better UX
  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  // 2. Randomize the books when data loads
  useEffect(() => {
    if (books.length > 0) {
        // Create a shallow copy to avoid mutating the original Redux state
        const shuffled = [...books].sort(() => 0.5 - Math.random());
        // Select the top 10 random books
        setRecommendedBooks(shuffled.slice(0, 10));
    }
  }, [books]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching recommendations</div>;

  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>
        
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
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
                    slidesPerView: 3, // Changed to 3 for better desktop visibility
                    spaceBetween: 50,
                }
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {recommendedBooks.length > 0 ? (
                recommendedBooks.map((book, index) => (
                    <SwiperSlide key={book._id || index}> {/* Use book._id for unique key */}
                        <BookCard book={book}/>
                    </SwiperSlide>
                ))
            ) : (
                <div className='text-gray-500'>No recommendations available.</div>
            )}
        </Swiper>
    </div>
  )
}

export default Recommened;