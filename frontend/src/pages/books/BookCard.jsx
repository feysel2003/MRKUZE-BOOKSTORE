import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { FaStar } from "react-icons/fa"; 
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({book}) => {

  const dispatch = useDispatch();
  
  const handleAddTocart = (product) =>{
    dispatch(addToCart(product))
  }

  // --- RATING LOGIC ---
  const getAverageRating = () => {
    if (!book.reviews || book.reviews.length === 0) return 0;
    const total = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / book.reviews.length).toFixed(1); 
  };

  const avgRating = getAverageRating();
  const reviewCount = book.reviews ? book.reviews.length : 0;
  // --------------------

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4 w-full">
        
        {/* --- Image Section --- 
            FIX: Added 'sm:w-48' to lock the width. 
            This prevents the image from pushing the text out when the screen is wide.
        */}
        <div className="sm:h-72 sm:flex-shrink-0 sm:w-48 border rounded-md overflow-hidden relative"> 
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt={book.title}
              className="w-full h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
            
          {/* Trending Badge */}
          {book.trending && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  Hot
              </span>
          )}
        </div>

        {/* --- Content Section --- */}
        <div className="flex flex-col justify-between flex-grow min-w-0 "> 
          <div>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg font-semibold hover:text-blue-600 mb-2 truncate">
                {book?.title}
              </h3>
            </Link>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-2">
                {avgRating > 0 ? (
                    <>
                        <FaStar className="text-yellow-400 text-sm" /> 
                        <span className="text-sm font-bold text-gray-700">{avgRating}</span>
                        <span className="text-xs text-gray-400">({reviewCount} reviews)</span>
                    </>
                ) : (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                        New
                    </span>
                )}
            </div>

            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {book?.description.length > 60 
                ? `${book.description.slice(0, 60)}...` 
                : book?.description}
            </p>
            
            <p className="font-medium mb-4">Birr. {book?.newPrice} <span className="line-through font-normal ml-2 text-gray-400 text-sm">Birr. {book?.oldPrice}</span>
            </p>
          </div>

          {/* Button */}
          <button 
            onClick={() => handleAddTocart(book)}
            className="btn-primary px-2 py-2 mr-4 space-x-2 flex items-center gap-1 whitespace-nowrap text-sm w-fit"
          >
            <FiShoppingCart className="size-4" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default BookCard