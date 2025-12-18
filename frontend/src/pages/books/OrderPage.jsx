import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/orderApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();

    const { data, isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email, {
        skip: !currentUser?.email,
    });

    const orders = data?.orders ?? [];

    if (isLoading) return <div>Loading....</div>;
    if (isError) return <div>Error getting orders data</div>;

    // Helper to get color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="text-gray-500">No Orders Found!</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={order._id} className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            
                            {/* Header: Order ID, Date, Status */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b pb-4 gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded">#{index + 1}</span>
                                        <h2 className="font-bold text-lg text-gray-800">Order ID: <span className="text-gray-600 font-normal text-sm">{order._id}</span></h2>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                {/* Left: Shipping Info */}
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Shipping Details</h3>
                                    <p className="text-gray-600 text-sm"><strong>Name:</strong> {order.name}</p>
                                    <p className="text-gray-600 text-sm"><strong>Email:</strong> {order.email}</p>
                                    <p className="text-gray-600 text-sm"><strong>Phone:</strong> {order.phone}</p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}
                                    </p>
                                </div>

                                {/* Right: Payment & Total */}
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Payment Info</h3>
                                    <p className="text-gray-600 text-sm"><strong>Method:</strong> {order.paymentMethod?.toUpperCase()}</p>
                                    <p className="text-gray-800 font-bold text-lg mt-2">Total: ${order.totalPrice.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Products List */}
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="font-semibold text-gray-700 mb-2">Ordered Items</h3>
                                <ul className="space-y-2">
                                    {order.productIds.map((product) => (
                                        <li key={product?._id || product} className="text-sm text-gray-600 flex items-center gap-2">
                                            {/* Logic to handle if backend is populated (Object) or raw (String) */}
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {typeof product === 'object' ? (
                                                <span>{product.title}</span> // Shows Title if backend populated
                                            ) : (
                                                <span>Book ID: {product}</span> // Fallback to ID
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;