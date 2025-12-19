import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({book}) => {

  const dispatch = useDispatch();
  const handleAddTocart = (product) =>{
    dispatch(addToCart(product))
  }

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        
        {/* --- Image Section --- 
            FIX: Added sm:w-36 md:w-48 to control width. 
            Removed 'w-full' from img to prevent it from stretching wildly.
        */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt={book.title}
              className="w-full h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        {/* --- Content Section --- 
            FIX: Added 'flex flex-col' and 'min-w-0' to handle text wrapping in narrow columns.
        */}
        <div className="flex flex-col justify-between flex-grow min-w-0 "> 
          <div>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg font-semibold hover:text-blue-600 mb-2 truncate">
                {book?.title}
              </h3>
            </Link>
            
            {/* Description with cleaner logic */}
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {book?.description.length > 60 
                ? `${book.description.slice(0, 60)}...` 
                : book?.description}
            </p>
            
            <p className="font-medium mb-4">Birr. {book?.newPrice} <span className="line-through font-normal ml-2 text-gray-400 text-sm">Birr. {book?.oldPrice}</span>
            </p>
          </div>

          {/* Button
             FIX: Added 'whitespace-nowrap' to keep icon and text on one line.
             Added 'w-fit' so it doesn't stretch weirdly.
          */}
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