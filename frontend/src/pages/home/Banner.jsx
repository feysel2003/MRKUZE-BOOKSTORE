import React from 'react'
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'
import { Link } from 'react-router-dom';

// FIX: Named import to match your utils file
import { getImgUrl } from '../../utils/getImgUrl';

const Banner = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  // Get the 3 latest books
  const bannerBooks = books.length > 0 ? books.slice(0, 3) : [];

  // Helper to handle both Remote URLs and Local Assets
  const getImage = (imageName) => {
      if (!imageName) return "/assets/books/book-1.png"; // Fallback
      return imageName.startsWith('http') ? imageName : getImgUrl(imageName);
  }

  return (
    <div className='flex flex-col md:flex-row py-16 justify-between items-center gap-12'>
        
        {/* --- Left Side: Text Content --- */}
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-6xl text-3xl font-bold mb-7 leading-snug'>
                New Releases <br/> 
                <span className='text-primary'>This Week</span>
            </h1>
            <p className='mb-10 text-gray-500 leading-relaxed font-normal md:w-4/5'>
                It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
            </p>
            <button className='btn-primary'>Subscribe</button>
        </div>

        {/* --- Right Side: 3D Book Stack --- */}
        <div className='md:w-1/2 w-full flex items-center justify-center md:justify-end'>
            
            {/* Relative container for the stack */}
            <div className="relative w-full max-w-sm h-80 sm:h-96 flex items-end justify-center md:justify-end px-4">
                
                {/* Book 3 (Smallest - Back) */}
                {bannerBooks[2] && (
                    <div className="absolute z-10 bottom-2 right-4 opacity-90 hover:z-40 hover:scale-105 transition-all duration-500">
                        <img 
                            src={`${getImage(bannerBooks[2].coverImage)}`} 
                            alt="Book 3" 
                            className="w-28 h-44 sm:w-36 sm:h-56 object-cover rounded shadow-lg border border-gray-300"
                        />
                    </div>
                )}

                {/* Book 2 (Medium - Middle) */}
                {bannerBooks[1] && (
                    <div className="absolute z-20 bottom-1 right-16 sm:right-24 hover:z-40 hover:scale-105 transition-all duration-500">
                        <img 
                            src={`${getImage(bannerBooks[1].coverImage)}`} 
                            alt="Book 2" 
                            className="w-32 h-52 sm:w-40 sm:h-64 object-cover rounded shadow-2xl border border-gray-300"
                        />
                    </div>
                )}

                {/* Book 1 (Largest - Front) */}
                {bannerBooks[0] && (
                    <div className="relative z-30 right-28 sm:right-44 hover:scale-105 transition-all duration-500 cursor-pointer">
                        <Link to={`/books/${bannerBooks[0]._id}`}>
                            <img 
                                src={`${getImage(bannerBooks[0].coverImage)}`} 
                                alt="Book 1" 
                                className="w-40 h-60 sm:w-48 sm:h-72 object-cover rounded shadow-[10px_10px_30px_rgba(0,0,0,0.5)] border border-gray-200"
                            />
                            {/* "New" Badge */}
                            <div className="absolute -top-3 -right-3 bg-yellow-400 text-red-700 font-bold px-3 py-1 rounded-full shadow-md text-sm">
                                New
                            </div>
                        </Link>
                    </div>
                )}

                {/* Floor Shadow to ground the books */}
                <div className="absolute bottom-0 right-10 w-64 h-6 bg-black/20 blur-xl rounded-[50%] z-0"></div>
            </div>
        </div>

    </div>
  )
}

export default Banner