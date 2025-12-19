import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'; // Use SweetAlert for the reset modal

const Login = () => {
  const [message, setMessage] = useState()
  const { loginUser, signInWithGoogle, resetPassword } = useAuth(); // 1. Get resetPassword from context
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
      
      // Force clear admin credentials to prevent role conflicts
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username'); 

      alert("Login Successful!")
      navigate("/")

    } catch (error) {
      // 2. Specific Error Handling
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
      
      // Force clear admin credentials
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

  // 3. Logic for Forgot Password Modal
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
                    <label className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor="email">
                        Email
                    </label>

                    <input 
                    {...register("email", { required: true })}
                    type="email" name='email' id='email' placeholder='Email Address' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>

                 <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor="password">
                        Password
                    </label>

                    <input 
                    {...register("password", { required: true })}
                    type="password"  name='password' id='password' placeholder='password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>
                
                {
                  message && <p className='text-red-500 text-xs italic mb-3 font-semibold'>{message}</p>
                }
                
                <div className='flex flex-wrap space-y-2 justify-between items-center mb-4'>
                    <button className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded focus:outline-none'>
                    Login
                    </button>
                    
                    {/* 4. Forgot Password Link */}
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

            {/*google sign in  */}
            <div className='mt-4'>
              <button 
              onClick={handleGoogleSignIn}
              className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                <FaGoogle className='mr-2'/>
                sign in with Google
              </button>
            </div>
            <p className='mt-5 text-center text-gray-500 text-xs'>&copy;2025 Mrkuze Book Store. All right reserved.</p>     
        </div>
    </div>
  )
}

export default Login