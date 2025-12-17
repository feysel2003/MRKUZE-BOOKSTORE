import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md'
import RevenueChart from './RevenueChart';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                })
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <Loading />

    return (
        <div className="space-y-6">
            
            {/* --- Stats Cards Section --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Total Products */}
                <div className="flex items-center p-6 bg-white shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="p-3 mr-4 text-purple-600 bg-purple-100 rounded-full">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">Total Products</p>
                        <p className="text-2xl font-bold text-gray-800">{data?.totalBooks}</p>
                    </div>
                </div>

                {/* Total Sales */}
                <div className="flex items-center p-6 bg-white shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="p-3 mr-4 text-green-600 bg-green-100 rounded-full">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">Total Sales</p>
                        <p className="text-2xl font-bold text-gray-800">${data?.totalSales}</p>
                    </div>
                </div>

                {/* Trending Books */}
                <div className="flex items-center p-6 bg-white shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="p-3 mr-4 text-red-600 bg-red-100 rounded-full">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                    <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">Trending Books</p>
                        <p className="text-2xl font-bold text-gray-800">{data?.trendingBooks} <span className="text-xs font-normal text-green-500">active</span></p>
                    </div>
                </div>

                {/* Total Orders - CLICKABLE */}
                <Link to="/dashboard/manage-orders" className="flex items-center p-6 bg-white shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-3 mr-4 text-blue-600 bg-blue-100 rounded-full">
                        <MdIncompleteCircle className='size-8' />
                    </div>
                    <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-800">{data?.totalOrders}</p>
                    </div>
                </Link>
            </section>

            {/* --- Main Dashboard Content Grid --- */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* 1. Revenue Chart */}
                <div className="xl:col-span-2 bg-white shadow-sm rounded-xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
                    </div>
                    {/* Fixed height to prevent disappearing on mobile */}
                    <div className="w-full h-80 min-h-[300px]">
                        <RevenueChart revenueData={data?.monthlySales} />
                    </div>
                </div>

                {/* 2. Recent Orders List & Actions */}
                <div className="flex flex-col gap-6">
                    
                    {/* Quick Actions Card */}
                    <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <Link to="/dashboard/add-new-book" className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                                <div className="p-2 bg-purple-200 rounded-full mb-2 group-hover:bg-purple-300">
                                    <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                                </div>
                                <span className="text-sm font-medium text-purple-700">Add Book</span>
                            </Link>
                            <Link to="/dashboard/manage-books" className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                                <div className="p-2 bg-blue-200 rounded-full mb-2 group-hover:bg-blue-300">
                                    <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                                </div>
                                <span className="text-sm font-medium text-blue-700">Manage</span>
                            </Link>
                         </div>
                    </div>

                    {/* Recent Orders List */}
                    <div className="bg-white shadow-sm rounded-xl border border-gray-100 flex-grow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                            {/* FIX: Link to the new Manage Orders page */}
                            <Link to="/dashboard/manage-orders" className="text-sm text-purple-600 hover:underline">View All</Link>
                        </div>
                        <ul className="space-y-4">
                            {data?.lastOrders?.length > 0 ? (
                                data.lastOrders.map((order) => (
                                    <li key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold mr-3">
                                                {order.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{order.name}</p>
                                                <p className="text-xs text-gray-500">{order.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-800">${order.totalPrice}</p>
                                            <p className="text-xs text-gray-400">Paid</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-center py-8 text-gray-500">No recent orders found.</li>
                            )}
                        </ul>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Dashboard