import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Removed FaGoogle as we use SVG now
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate(); 

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange" 
    });

    const passwordValue = watch("password", "");

    const getPasswordStrength = (pass) => {
        let score = 0;
        if (!pass) return { score: 0, label: "", color: "" };

        if (pass.length > 5) score++; 
        if (pass.length > 8) score++; 
        if (/[0-9]/.test(pass)) score++; 
        if (/[^A-Za-z0-9]/.test(pass)) score++; 
        if (/[A-Z]/.test(pass)) score++; 

        if (score <= 2) return { score, label: "Weak", color: "bg-red-500 text-red-500" };
        if (score <= 4) return { score, label: "Medium", color: "bg-yellow-500 text-yellow-500" };
        return { score, label: "Strong", color: "bg-green-500 text-green-500" };
    };

    const strength = getPasswordStrength(passwordValue);

    const onSubmit = async (data) => {
        setMessage(""); 
        try {
            await registerUser(data.email, data.password);
            alert("User Registered successfully!");
            navigate("/"); 
        } catch (error) {
            console.error("Registration Error:", error.code);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setMessage("This email is already in use. Please login instead.");
                    break;
                case 'auth/invalid-email':
                    setMessage("Please enter a valid email address.");
                    break;
                case 'auth/weak-password':
                    setMessage("Password should be at least 6 characters.");
                    break;
                case 'auth/network-request-failed':
                    setMessage("Network error. Check your internet connection.");
                    break;
                default:
                    setMessage("Registration failed. Please try again later.");
            }
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            alert("Google sign in failed!");
            console.error(error);
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Register</h2>

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email" name='email' id='email' 
                            placeholder='Email Address' 
                            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${errors.email ? 'border-red-500' : ''}`} 
                        />
                        {errors.email && <p className='text-red-500 text-xs italic mt-1'>{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                            Password
                        </label>
                        
                        <div className="relative">
                            <input
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                type={showPassword ? "text" : "password"} 
                                name='password' 
                                id='password' 
                                placeholder='Password' 
                                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow pr-10 ${errors.password ? 'border-red-500' : ''}`} 
                            />
                            
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        
                        {errors.password && <p className='text-red-500 text-xs italic mt-1'>{errors.password.message}</p>}

                        {/* Password Strength Meter */}
                        {passwordValue && !errors.password && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-xs font-semibold ${strength.color.split(" ")[1]}`}>
                                        Strength: {strength.label}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                    <div 
                                        className={`h-1.5 rounded-full transition-all duration-300 ${strength.color.split(" ")[0]}`} 
                                        style={{ width: `${(strength.score / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* General Error Message */}
                    {message && <p className='text-red-500 text-xs italic mb-3 font-semibold'>{message}</p>}

                    <div>
                        <button className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded focus:outline-none'>
                            Register
                        </button>
                    </div>
                </form>

                <p className='align-baseline font-medium mt-4 text-sm'>
                    Have an account? Please <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                </p>

                {/* --- OFFICIAL GOOGLE SIGN IN BUTTON --- */}
                <div className='mt-4'>
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        {/* Official Google "G" Logo SVG */}
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.33-4.77 6.81l7.98 6.19c4.64-4.32 7.32-10.14 7.32-17.45z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98 6.19c.48-1.45.76-2.99.76-4.59z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.25 1.54-5.02 2.48-7.91 2.48-6.23 0-11.53-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
                
                <p className='mt-5 text-center text-gray-500 text-xs'>&copy;2025 Mrkuze Book Store. All right reserved.</p>
            </div>
        </div>
    )
}

export default Register