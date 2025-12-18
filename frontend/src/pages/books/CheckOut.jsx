import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/orderApi';
import Swal from 'sweetalert2';
import { FaMoneyBillWave, FaCreditCard, FaFileUpload } from "react-icons/fa";
import axios from 'axios'; // Ensure axios is installed (npm install axios)

const CheckOut = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    
    const [paymentMethod, setPaymentMethod] = useState('cod'); 
    const [isChecked, setIsChecked] = useState(false);
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // --- CLOUDINARY CONFIGURATION ---
    // Replace these with your actual values from Step 1
    const cloud_name = "dosln7f10"; 
    const upload_preset = "mrkuze_bookstore_preset";

    const onSubmit = async (data) => {
        let paymentProofUrl = "";

        // 1. Upload Logic using Cloudinary (No Firebase needed)
        if (paymentMethod === 'bank') {
            const file = data.screenshot[0];
            if (!file) {
                alert("Please upload a screenshot for Bank Transfer.");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", upload_preset);

            try {
                // Post directly to Cloudinary API
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, 
                    formData
                );
                paymentProofUrl = response.data.secure_url;
                console.log("Uploaded to Cloudinary:", paymentProofUrl);
            } catch (error) {
                console.error("Cloudinary upload failed:", error);
                alert("Failed to upload image. Please try again.");
                return;
            }
        }

        // 2. Create Order Object
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            paymentProof: paymentProofUrl // The Cloudinary URL
        }

        // 3. Save to Database
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your Order Placed successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay!"
            });
            navigate("/orders");
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place an order");
        }
    }

    if (isLoading) return <div>Loading....</div>

    return (
        <section className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Left Side: Summary & Payment */}
                    <div className="md:col-span-4 order-2 md:order-1">
                        <div className="bg-white rounded shadow-lg p-6">
                            <h2 className="font-semibold text-xl text-gray-600 mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Items ({cartItems.length}):</span>
                                <span className="text-gray-900 font-bold">${totalPrice}</span>
                            </div>
                            <hr className="my-4" />
                            
                            <h3 className="font-semibold text-lg text-gray-600 mb-3">Payment Method</h3>
                            <div className="space-y-3">
                                <div onClick={() => setPaymentMethod('cod')} className={`cursor-pointer border p-3 rounded-lg flex items-center gap-3 transition-all ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                                    <FaMoneyBillWave className="text-green-600 text-xl" />
                                    <div><p className="font-bold text-gray-700">Cash on Delivery</p></div>
                                    <input type="radio" checked={paymentMethod === 'cod'} readOnly className="ml-auto" />
                                </div>

                                <div onClick={() => setPaymentMethod('bank')} className={`cursor-pointer border p-3 rounded-lg flex items-center gap-3 transition-all ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                                    <FaFileUpload className="text-purple-600 text-xl" />
                                    <div><p className="font-bold text-gray-700">Bank Transfer</p></div>
                                    <input type="radio" checked={paymentMethod === 'bank'} readOnly className="ml-auto" />
                                </div>

                                <div onClick={() => setPaymentMethod('card')} className={`cursor-pointer border p-3 rounded-lg flex items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                                    <FaCreditCard className="text-blue-600 text-xl" />
                                    <div><p className="font-bold text-gray-700">Credit Card</p></div>
                                    <input type="radio" checked={paymentMethod === 'card'} readOnly className="ml-auto" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="md:col-span-8 order-1 md:order-2">
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="text-gray-600 mb-6"><p className="font-medium text-lg">Shipping Details</p></div>

                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2 mb-6">
                                    <div className="md:col-span-2"><label>Full Name</label><input {...register("name", { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /></div>
                                    <div className="md:col-span-1"><label>Email</label><input className="h-10 border mt-1 rounded px-4 w-full bg-gray-100" disabled defaultValue={currentUser?.email} /></div>
                                    <div className="md:col-span-1"><label>Phone</label><input {...register("phone", { required: true })} type="number" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /></div>
                                    <div className="md:col-span-2"><label>Address</label><input {...register("address", { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /></div>
                                    <div className="md:col-span-1"><label>City</label><input {...register("city", { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /></div>
                                    <div className="md:col-span-1"><label>Country</label><input {...register("country", { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /></div>
                                    <div className="md:col-span-1"><label>State</label><input {...register("state", { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /></div>
                                    <div className="md:col-span-1"><label>Zipcode</label><input {...register("zipcode", { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /></div>
                                </div>

                                {/* Bank Transfer Upload UI */}
                                {paymentMethod === 'bank' && (
                                    <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-200">
                                        <h4 className="font-bold text-purple-700 mb-2">Upload Payment Screenshot</h4>
                                        <p className="text-sm text-gray-600 mb-3">Please transfer <b>${totalPrice}</b> and upload receipt.</p>
                                        <input 
                                            {...register("screenshot", { required: true })}
                                            type="file" 
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                                        />
                                    </div>
                                )}

                                {paymentMethod === 'card' && (
                                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                                        <h4 className="font-bold text-blue-700 mb-2">Credit Card (Demo)</h4>
                                        <input placeholder="Card Number" className="h-10 border rounded px-4 w-full bg-white" />
                                    </div>
                                )}

                                <div className="mt-4">
                                    <div className="inline-flex items-center">
                                        <input {...register("billing_same")} onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                                        <label className="ml-2 text-sm text-gray-600">I agree to Terms & Conditions.</label>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button disabled={!isChecked} className={`w-full font-bold py-3 px-4 rounded transition-colors ${isChecked ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                                        Place Order (${totalPrice})
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckOut