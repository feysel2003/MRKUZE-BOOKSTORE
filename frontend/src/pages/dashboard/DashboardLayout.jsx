import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
// Removed useAuth import to prevent conflict

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin"); // Local state for admin name
  const navigate = useNavigate();

  // --- FIX: Load Admin Name from Local Storage ---
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if(storedName) {
       setAdminName(storedName);
    }
  }, []);
  // -----------------------------------------------

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate("/");
  }

  return (
    <section className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* --- MOBILE BACKDROP OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR --- */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-center h-20 bg-purple-600 border-b border-purple-500">
            <Link to="/" className='flex items-center gap-2 font-bold text-xl'>
              <img src="/fav-icon.png" alt="Logo" className="w-8 h-8 filter brightness-0 invert" />
              <span>BookStore</span>
            </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink 
              to="/dashboard" 
              end
              onClick={() => setIsSidebarOpen(false)} 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 transition-colors rounded-lg font-medium ${isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`
              }
            >
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Dashboard
            </NavLink>

            <NavLink 
              to="/dashboard/manage-users" 
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 transition-colors rounded-lg font-medium ${isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`
              }
            >
              {/* You can import a User Icon like FaUsers from react-icons */}
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Manage Users
            </NavLink>

            <NavLink 
              to="/dashboard/add-new-book" 
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 transition-colors rounded-lg font-medium ${isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`
              }
            >
              <HiViewGridAdd className="h-6 w-6 mr-3"/>
              Add Book
            </NavLink>

            <NavLink 
              to="/dashboard/manage-books" 
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 transition-colors rounded-lg font-medium ${isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`
              }
            >
              <MdOutlineManageHistory className="h-6 w-6 mr-3"/>
              Manage Books
            </NavLink>

            
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
             <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-400 hover:text-red-400 transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
             </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200 shadow-sm z-10">
          
          <div className="flex items-center gap-4">
            {/* Hamburger Button (Mobile Only) */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 focus:outline-none md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6H20M4 12H20M4 18H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Admin Dashboard</h1>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-4">
             {/* Dynamic Name based on Local Storage */}
             <div className="hidden md:flex flex-col items-end">
                <span className="font-semibold text-gray-800 text-sm">
                  {adminName}
                </span>
                <span className="text-xs text-purple-600 font-bold bg-purple-100 px-2 py-0.5 rounded-full">
                  Admin
                </span>
             </div>

             <div className="h-10 w-10 rounded-full ring-2 ring-purple-100 p-0.5">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin&background=random" 
                  alt="Profile" 
                  className="h-full w-full rounded-full object-cover"
                />
             </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8">
           <Outlet/>
        </main>
      </div>
    </section>
  )
}

export default DashboardLayout