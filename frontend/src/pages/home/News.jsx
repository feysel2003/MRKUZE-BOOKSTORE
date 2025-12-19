import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';
import axios from 'axios';

// Icons
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

// Default image
import news1 from "../../assets/news/news-1.png"

const News = () => {
  const [news, setNews] = useState([]);
  
  // 1. Navigation State
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

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
    <div className='py-16 relative'> {/* Relative for buttons */}
        <h2 className='text-3xl font-semibold mb-6'>News</h2>

        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            // 2. Link Navigation to State
            navigation={{ prevEl, nextEl }}
            breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 2, spaceBetween: 50 },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper relative"
        >
            {news.length > 0 ? (
                news.map((item, index) => (
                    <SwiperSlide key={index} className="h-auto"> {/* h-auto helps with equal height */}
                        {/* 
                           Layout Fixes: 
                           1. h-full: Makes card fill the slide height
                           2. min-h-[280px]: Ensures a minimum size
                           3. Fixed Image dimensions to prevent layout shifts
                        */}
                        <div className='flex flex-col md:flex-row justify-between items-center gap-6 border p-4 rounded-lg shadow-sm h-full'>
                            
                            {/* Text Content - Takes 50% width on large screens */}
                            <div className='w-full md:w-1/2 flex flex-col justify-start h-full'>
                                <Link to={item.url} target="_blank" rel="noopener noreferrer">
                                    <h3 className='text-lg font-bold hover:text-blue-500 mb-2 line-clamp-2 h-14 overflow-hidden'>
                                        {item.title}
                                    </h3>
                                </Link>
                                <div className='w-12 h-[4px] bg-primary mb-4'></div>
                                <p className='text-sm text-gray-600 line-clamp-4'>
                                    {item.description}
                                </p>
                            </div>
                            
                            {/* Image - Takes 50% width on large screens */}
                            <div className='w-full md:w-1/2'>
                                <img 
                                    src={item.urlToImage || news1} 
                                    alt={item.title} 
                                    // Fixed Height (h-48) ensures all images match perfectly
                                    className="w-full h-48 object-cover rounded-md"
                                    onError={(e) => { e.target.src = news1; }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <div className='text-gray-500'>Loading news...</div>
            )}

            {/* --- 3. Custom Overlay Buttons --- */}
            
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

export default News