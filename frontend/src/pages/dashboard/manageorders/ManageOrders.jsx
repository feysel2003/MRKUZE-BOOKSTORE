import React from 'react';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../../redux/features/orders/orderApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';

const ManageOrders = () => {
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    // Function to handle status change
    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateOrderStatus({ id, status: newStatus }).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Status Updated',
                text: `Order marked as ${newStatus}`,
                timer: 1500
            });
        } catch (error) {
            console.error("Failed to update status", error);
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    // Function to view payment proof
    const handleViewProof = (imageUrl) => {
        if(!imageUrl) {
            Swal.fire("No Proof", "User did not upload a screenshot.", "info");
            return;
        }
        Swal.fire({
            imageUrl: imageUrl,
            imageAlt: "Payment Proof",
            title: "Bank Transfer Proof",
            width: 600,
            imageWidth: '100%',
            confirmButtonText: "Close"
        });
    };

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching orders</div>;

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All Orders</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">#</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Order ID</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">User</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Total</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Payment</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Status</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders && orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index + 1}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {order._id}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {order.name} <br/>
                                            <span className="text-gray-400 font-normal">{order.email}</span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            ${order.totalPrice}
                                        </td>
                                        
                                        {/* Payment Method Column */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <span className={`px-2 py-1 rounded text-white text-xs font-bold
                                                ${order.paymentMethod === 'cod' ? 'bg-blue-500' : 
                                                  order.paymentMethod === 'bank' ? 'bg-purple-500' : 'bg-green-500'}`}>
                                                {order.paymentMethod.toUpperCase()}
                                            </span>
                                        </td>

                                        {/* Status Dropdown */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className={`border rounded px-2 py-1 outline-none text-xs font-semibold cursor-pointer
                                                    ${order.status === 'completed' ? 'text-green-600 border-green-200 bg-green-50' : 
                                                      order.status === 'pending' ? 'text-orange-600 border-orange-200 bg-orange-50' : 'text-blue-600'}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>

                                        {/* Actions (View Proof) */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {order.paymentMethod === 'bank' ? (
                                                <button 
                                                    onClick={() => handleViewProof(order.paymentProof)}
                                                    className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition"
                                                >
                                                    View Proof
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageOrders;