import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMiniBars3CenterLeft, HiXMark } from "react-icons/hi2"; // Imported HiX for close button
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" }
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 1. Sidebar State
  const [searchQuery, setSearchQuery] = useState(""); 
  
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    setIsSidebarOpen(false); // Close sidebar on logout
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        navigate(`/?search=${searchQuery}`);
        setTimeout(() => {
          const section = document.getElementById("books-section");
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        navigate('/');
      }
    }
  }

  return (
    <>
      <header className="max-w-screen-2xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">

          {/* Left side */}
          <div className='flex items-center md:gap-16 gap-4'>
            
            {/* 2. Hamburger Button (Trigger) */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="focus:outline-none text-gray-700 hover:text-primary transition-colors"
            >
              <HiMiniBars3CenterLeft className='size-6' />
            </button>

            {/* Search */}
            <div className='relative sm:w-72 w-40 space-x-2'>
              <IoSearchOutline className='absolute inline-block left-3 inset-y-2 text-gray-500' />
              <input
                type="text"
                placeholder='Search books...'
                className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-sm'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          {/* Right side */}
          <div className='relative flex items-center md:space-x-3 space-x-2'>

            {/* User Profile */}
            <div className='flex items-center mb-[2px]'> 
              {currentUser ? (
                <>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img
                      src={currentUser?.photoURL || avatarImg}
                      alt='User Avatar'
                      className={`size-7 rounded-full object-cover ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-8 mt-2 w-48 bg-white shadow-lg p-3 rounded-md z-40 border border-gray-100">
                      <ul className='py-2'>
                        {navigation.map(item => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                            <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100 rounded-md'>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <button 
                            onClick={handleLogOut}
                            className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md text-red-500 font-medium'
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to='/login'>
                  <HiOutlineUser className='size-6' />
                </Link>
              )}
            </div>

            <button className='hidden sm:block'>
              <HiOutlineHeart className='size-6' />
            </button>

            <Link to='/cart' className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm transition-transform hover:scale-105'>
              <HiOutlineShoppingCart />
              {
                cartItems.length > 0 
                  ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> 
                  : <span className='text-sm font-semibold sm:ml-1'>0</span>
              }
            </Link>
          </div>

        </nav>
      </header>

      {/* 3. SIDEBAR (Off-Canvas Menu) */}
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex justify-between items-center border-b">
          <Link to="/" onClick={() => setIsSidebarOpen(false)} className="text-xl font-bold text-gray-800">
            BookStore
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="text-gray-500 hover:text-red-500 p-1"
          >
            <HiXMark className="size-6" />
          </button>
        </div>

        <div className="py-4">
          <ul className="space-y-2">
            {/* Add Home Link specifically for sidebar */}
            <li>
              <Link 
                to="/" 
                onClick={() => setIsSidebarOpen(false)}
                className="block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium"
              >
                Home
              </Link>
            </li>
            
            {/* Map through existing navigation */}
            {navigation.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.href} 
                  onClick={() => setIsSidebarOpen(false)}
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Actions in Sidebar (Mobile friendly) */}
          <div className="border-t mt-4 px-6 py-4">
            {currentUser ? (
              <button 
                onClick={handleLogOut}
                className="w-full text-left flex items-center gap-2 text-red-500 font-medium"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsSidebarOpen(false)}
                className="block text-primary font-medium"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;