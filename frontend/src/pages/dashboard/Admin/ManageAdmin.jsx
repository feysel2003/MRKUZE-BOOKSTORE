import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUserPlus, FaEdit, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import getBaseurl from '../../../utils/baseURL';

const ManageAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State for Password Strength (Add Form)
    const [passwordStrength, setPasswordStrength] = useState("");
    
    // State for Editing
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editStrength, setEditStrength] = useState("");

    const currentUser = localStorage.getItem('username'); // Get logged in username

    // Forms
    const { register, handleSubmit, reset, watch: watchAdd } = useForm();
    const { 
        register: registerEdit, 
        handleSubmit: handleSubmitEdit, 
        setValue: setEditValue, 
        watch: watchEdit,
        reset: resetEdit
    } = useForm();

    // --- PASSWORD STRENGTH LOGIC ---
    const checkStrength = (password) => {
        if (!password) return "";
        let strength = 0;
        if (password.length > 5) strength++; // Length check
        if (password.length > 10) strength++; // Length check
        if (/[A-Z]/.test(password)) strength++; // Uppercase letter
        if (/[0-9]/.test(password)) strength++; // Number
        if (/[^A-Za-z0-9]/.test(password)) strength++; // Special char

        if (strength <= 2) return "Weak";
        if (strength <= 4) return "Medium";
        return "Strong";
    };

    // Watch password input for Add Form
    const addPassword = watchAdd("password");
    useEffect(() => {
        setPasswordStrength(checkStrength(addPassword));
    }, [addPassword]);

    // Watch password input for Edit Form
    const editPassword = watchEdit("password");
    useEffect(() => {
        setEditStrength(checkStrength(editPassword));
    }, [editPassword]);

    // --- FETCH DATA ---
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${getBaseurl()}/api/auth`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- ADD USER ---
    const onSubmit = async (data) => {
        try {
            await axios.post(`${getBaseurl()}/api/auth/register`, data, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            Swal.fire("Success", "New Admin Added!", "success");
            reset();
            setPasswordStrength("");
            fetchUsers();
        } catch (error) {
            console.error("Error registering admin", error);
            Swal.fire("Error", "Failed to add admin", "error");
        }
    };

    // --- DELETE USER ---
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${getBaseurl()}/api/auth/${id}`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    });
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                    fetchUsers();
                } catch (error) {
                    Swal.fire("Error", "Failed to delete user", "error");
                }
            }
        });
    };

    // --- EDIT USER HANDLERS ---
    const openEditModal = (user) => {
        setEditingUser(user);
        setEditValue("username", user.username);
        setEditValue("password", ""); // Reset password field
        setIsEditModalOpen(true);
    };

    const onEditSubmit = async (data) => {
        try {
            // Only send password if user typed something
            const updateData = { username: data.username };
            if (data.password) updateData.password = data.password;

            await axios.put(`${getBaseurl()}/api/auth/${editingUser._id}`, updateData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            Swal.fire("Success", "Profile updated successfully!", "success");
            setIsEditModalOpen(false);
            resetEdit();
            fetchUsers();
            
            // If username changed, update local storage
            if (editingUser.username === currentUser && data.username !== currentUser) {
                localStorage.setItem("username", data.username);
                // Ideally prompt re-login, but simple update for now
            }

        } catch (error) {
            console.error("Error updating user", error);
            Swal.fire("Error", "Failed to update profile", "error");
        }
    };

    // Helper to get color for strength
    const getStrengthColor = (str) => {
        if (str === "Weak") return "text-red-500 bg-red-100";
        if (str === "Medium") return "text-yellow-600 bg-yellow-100";
        if (str === "Strong") return "text-green-600 bg-green-100";
        return "hidden";
    };

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
                
                {/* --- ADD NEW ADMIN FORM --- */}
                <div className="bg-white p-6 rounded shadow-lg mb-8">
                    <h3 className="font-semibold text-lg text-blueGray-700 mb-4 flex items-center gap-2">
                        <FaUserPlus/> Add New Admin
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div className="w-full">
                            <label className="block text-sm font-bold mb-2">Username</label>
                            <input {...register("username", { required: true })} className="border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter username"/>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-bold mb-2">Password</label>
                            <input {...register("password", { required: true })} type="password" className="border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter password"/>
                            
                            {/* Strength Meter (Add Form) */}
                            {passwordStrength && (
                                <div className={`mt-2 text-xs font-bold px-2 py-1 rounded w-fit ${getStrengthColor(passwordStrength)}`}>
                                    Strength: {passwordStrength}
                                </div>
                            )}
                        </div>
                        <div className="w-full pt-1 md:pt-7">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded h-10 w-full">
                                Add
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- USERS TABLE --- */}
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <h3 className="font-semibold text-base text-blueGray-700">All Admins</h3>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">#</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Username</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Role</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                            {index + 1}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {user.username} {user.username === currentUser && <span className="text-purple-600 font-bold ml-2">(You)</span>}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <span className="px-2 py-1 rounded text-xs font-bold bg-purple-500 text-white">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            
                                            {/* EDIT BUTTON (Only for your own user) */}
                                            {user.username === currentUser && (
                                                <button 
                                                    onClick={() => openEditModal(user)}
                                                    className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded mr-2 transition flex-inline items-center gap-1"
                                                >
                                                    <FaEdit/> Edit
                                                </button>
                                            )}

                                            <button 
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded transition flex-inline items-center gap-1"
                                            >
                                                <FaTrashAlt/> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- EDIT MODAL --- */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={20}/>
                            </button>
                            
                            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
                            
                            <form onSubmit={handleSubmitEdit(onEditSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Username</label>
                                    <input 
                                        {...registerEdit("username", { required: true })} 
                                        className="border rounded w-full py-2 px-3 text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">New Password (Optional)</label>
                                    <input 
                                        {...registerEdit("password")} 
                                        type="password"
                                        placeholder="Leave blank to keep current"
                                        className="border rounded w-full py-2 px-3 text-gray-700"
                                    />
                                    {/* Strength Meter (Edit Form) */}
                                    {editStrength && (
                                        <div className={`mt-2 text-xs font-bold px-2 py-1 rounded w-fit ${getStrengthColor(editStrength)}`}>
                                            Strength: {editStrength}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex justify-end gap-3 mt-6">
                                    <button 
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ManageAdmin;