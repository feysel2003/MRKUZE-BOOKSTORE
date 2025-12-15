import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
    try {
      
    } catch (error) {
      setMessage("Please Provide Valid username and password")
        console.error(error)
    }
  }


  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor="username">
                        Username
                    </label>

                    <input 
                    {...register("username", { required: true })}

                    type="text" name='username' id='username' placeholder='username' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
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
  message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
}
        <div className='w-full'>
            <button className='bg-blue-500 w-full hover:bg-blue-800 text-white font-bold py-2 px-8 rounded focus:outline-none'>
            Login
            </button>
        </div>
                </form>

       <p className='mt-5 text-center text-gray-500 text-xs'>&copy;2025 Mrkuze Book Store. All right reserved.</p>     
        </div>
    </div>
  )
}

export default AdminLogin