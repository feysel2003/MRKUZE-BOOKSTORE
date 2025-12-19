import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';
import axios from 'axios';

// Default image (keep your import)
import news1 from "../../assets/news/news-1.png"

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        
        // Updated Query: books AND technology (relevant for students)
        const response = await axios.get(`https://newsapi.org/v2/everything?q=books+technology&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`);
        
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>
            News
        </h2>

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
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            
            {news.length > 0 ? (
                news.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                            {/* content */}
                            <div className='py-4'>
                                <Link to={item.url} target="_blank" rel="noopener noreferrer">
                                    <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>
                                        {item.title}
                                    </h3>
                                </Link>
                                <div className='w-12 h-[4px] bg-primary mb-5'></div>
                                <p className='text-sm text-gray-600'>
                                    {/* Truncate description slightly to keep design consistent if text is huge */}
                                    {item.description && item.description.length > 120 
                                        ? `${item.description.substring(0, 120)}...` 
                                        : item.description}
                                </p>
                            </div>
                            
                            {/* Image - Kept your exact classes */}
                            <div className='flex-shrink-0'>
                                <img 
                                    src={item.urlToImage || news1} 
                                    alt={item.title} 
                                    className="w-full object-cover"
                                    // Added a small inline style to mimic your static image size if API images are too huge
                                    // You can remove style={{ maxWidth: '150px' }} if you want them full size
                                    style={{ maxWidth: '100%', maxHeight: '150px', width: 'auto' }} 
                                    onError={(e) => { e.target.src = news1; }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                // Optional: Show your dummy data or loading state if API fails
                <div className='text-gray-500'>Loading news...</div>
            )}
        </Swiper>
    </div>
  )
}

export default News