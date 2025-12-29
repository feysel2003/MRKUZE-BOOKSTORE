import React, { useState } from 'react'
import { getImgUrl } from '../../utils/getImgUrl'
import { useParams, Link } from "react-router-dom"
import { FiShoppingCart } from 'react-icons/fi'
import { FaStar } from "react-icons/fa"; // Import Star Icon
import { useFetchBookByIdQuery, usePostReviewMutation } from '../../redux/features/books/booksApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useAuth } from '../../context/AuthContext'; // To get user info
import Swal from 'sweetalert2';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    
    // Mutation Hook for posting reviews
    const [postReview, { isLoading: isPosting }] = usePostReviewMutation();

    // Local State for the Form
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hover, setHover] = useState(0); // For star hover effect

    const handleAddTocart = (product) => {
        dispatch(addToCart(product))
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            Swal.fire("Error", "Please select a star rating", "error");
            return;
        }

        try {
            await postReview({
                id: id,
                comment: comment,
                rating: rating,
                userId: currentUser?.uid,
                userName: currentUser?.displayName || currentUser?.email, // Fallback if name is missing
            }).unwrap();

            Swal.fire("Success", "Review posted successfully!", "success");
            setComment("");
            setRating(0);
        } catch (error) {
            console.error("Failed to post review", error);
            Swal.fire("Error", "Failed to post review. Please try again.", "error");
        }
    }

    if (isLoading) return <div>Loading....</div>
    if (isError) return <div> Error happening to load book info </div>

    return (
        <div className="max-w-4xl mx-auto p-5 shadow-md bg-white rounded-md my-10">
            
            {/* --- BOOK DETAILS SECTION --- */}
            <h1 className='text-2xl font-bold mb-6'>{book.title}</h1>
            <div className='flex flex-col md:flex-row gap-8'>
                <div className='flex-shrink-0'>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8 w-full md:w-80 rounded-md object-cover shadow-sm" 
                    />
                </div>

                <div className='flex-grow mb-5'>
                    <p className='text-gray-500 mb-2'><strong>Author:</strong> {book.author || 'admin'}</p>
                    <p className='text-gray-700 mb-4'><strong>Publish: </strong> {new Date(book?.createdAt).toLocaleString()}</p>
                    <p className='text-gray-700 mb-4 capitalize'><strong>Category:</strong> {book?.category}</p>
                    <p className='text-gray-700 mb-6 leading-relaxed'>
                        <strong>Description:</strong> {book.description}
                    </p>

                    <button onClick={() => handleAddTocart(book)} className='btn-primary px-6 py-3 space-x-1 flex items-center gap-2 font-bold'>
                        <FiShoppingCart className="" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            <hr className='my-10 border-gray-200' />

            {/* --- REVIEWS SECTION --- */}
            <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800">Customer Reviews</h3>

                {/* 1. Review List */}
                <div className="space-y-6 mb-10">
                    {book?.reviews && book.reviews.length > 0 ? (
                        book.reviews.map((review, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                                            {review.userName.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-semibold text-gray-700">{review.userName}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                {/* Star Display */}
                                <div className="flex text-yellow-400 mb-2 text-sm">
                                    {[...Array(5)].map((star, i) => (
                                        <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
                                    ))}
                                </div>
                                
                                <p className="text-gray-600 text-sm">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                    )}
                </div>

                {/* 2. Add Review Form */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h4 className="text-lg font-bold mb-4">Write a Review</h4>
                    
                    {currentUser ? (
                        <form onSubmit={handleReviewSubmit}>
                            {/* Star Rating Input */}
                            <div className="flex items-center gap-1 mb-4">
                                <span className="mr-2 text-gray-700 font-medium">Rating:</span>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index}>
                                            <input 
                                                type="radio" 
                                                name="rating" 
                                                value={ratingValue} 
                                                onClick={() => setRating(ratingValue)}
                                                className="hidden"
                                            />
                                            <FaStar 
                                                className="cursor-pointer transition-colors" 
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                                size={24}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>

                            <textarea
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                rows="4"
                                placeholder="Share your thoughts..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>

                            <button 
                                type="submit" 
                                disabled={isPosting}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
                            >
                                {isPosting ? "Posting..." : "Submit Review"}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-yellow-50 p-4 rounded text-yellow-800 text-sm">
                            Please <Link to="/login" className="font-bold underline">Login</Link> to write a review.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleBook