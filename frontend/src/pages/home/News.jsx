import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';
import axios from 'axios';

// Default image
import news1 from "../../assets/news/news-1.png"

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
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
        <h2 className='text-3xl font-semibold mb-6'>News</h2>

        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true} 
            // Removed loop={true} to fix the navigation freezing issue
            breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 2, spaceBetween: 50 },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {news.length > 0 ? (
                news.map((item, index) => (
                    <SwiperSlide key={index}>
                        {/* 
                           Layout Change: 
                           1. flex-col on mobile, flex-row on larger screens 
                           2. items-center to align vertically
                           3. gap-6 for spacing 
                        */}
                        <div className='flex flex-col lg:flex-row justify-between items-center gap-6 border p-4 rounded-lg shadow-sm'>
                            
                            {/* Text Content - Takes 50% width on large screens */}
                            <div className='w-full lg:w-1/2'>
                                <Link to={item.url} target="_blank" rel="noopener noreferrer">
                                    <h3 className='text-lg font-bold hover:text-blue-500 mb-2 line-clamp-2'>
                                        {item.title}
                                    </h3>
                                </Link>
                                <div className='w-12 h-[4px] bg-primary mb-4'></div>
                                <p className='text-sm text-gray-600 line-clamp-4'>
                                    {item.description}
                                </p>
                            </div>
                            
                            {/* Image - Takes 50% width on large screens */}
                            <div className='w-full lg:w-1/2 h-full'>
                                <img 
                                    src={item.urlToImage || news1} 
                                    alt={item.title} 
                                    // w-full to fill the 50% container, aspect-video to keep a nice ratio
                                    className="w-full h-48 lg:h-56 object-cover rounded-md"
                                    onError={(e) => { e.target.src = news1; }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <div className='text-gray-500'>Loading news...</div>
            )}
        </Swiper>
    </div>
  )
}

export default News