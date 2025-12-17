import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // NEW: Check for the role

    // If no token OR the role is not admin, kick them out
    if(!token || role !== 'admin') {
        // Redirect to the Admin Login page, not the public home
        return <Navigate to="/admin" replace/>
    }

    return children ? children : <Outlet/>;
}

export default AdminRoute