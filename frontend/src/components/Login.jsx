import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'; 

const Login = () => {
  const [message, setMessage] = useState()
  const { loginUser, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username'); 

      alert("Login Successful!")
      navigate("/")

    } catch (error) {
      console.error("Login Error:", error.code);
      switch (error.code) {
        case 'auth/invalid-credential':
            setMessage("Invalid email or password. Please try again.");
            break;
        case 'auth/user-not-found':
            setMessage("No account found with this email.");
            break;
        case 'auth/wrong-password':
            setMessage("Incorrect password.");
            break;
        case 'auth/too-many-requests':
            setMessage("Too many failed attempts. Please try again later.");
            break;
        default:
            setMessage("Login failed. Please check your credentials.");
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');

      alert("Login successful!");
      navigate("/")
    } catch (error) {
      alert("Google sign in failed!")
      console.error(error)
    }
  }

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Reset Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'email@example.com',
      showCancelButton: true,
      confirmButtonText: 'Send Reset Link',
      confirmButtonColor: "#3b82f6",
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write your email!'
        }
      }
    })

    if (email) {
      const cleanEmail = email.trim(); 
      try {
        await resetPassword(cleanEmail);
        Swal.fire({
            title: 'Sent!',
            text: 'Password reset link has been sent to your email.',
            icon: 'success',
            confirmButtonColor: "#3b82f6"
        });
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to send reset link. Please check if the email is correct.', 'error');
      }
    }
  }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                        Email
                    </label>
                    <input 
                    {...register("email", { required: true })}
                    type="email" name='email' id='email' placeholder='Email Address' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>

                 <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                        Password
                    </label>
                    <input 
                    {...register("password", { required: true })}
                    type="password"  name='password' id='password' placeholder='password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>
                
                {message && <p className='text-red-500 text-xs italic mb-3 font-semibold'>{message}</p>}
                
                <div className='flex flex-wrap space-y-2 justify-between items-center mb-4'>
                    <button className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded focus:outline-none'>
                    Login
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleForgotPassword}
                        className='text-sm text-blue-500 hover:text-blue-800 underline focus:outline-none'
                    >
                        Forgot Password?
                    </button>
                </div>
            </form>
            
            <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link></p>

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

export default Login