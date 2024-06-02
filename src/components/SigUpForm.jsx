import React, { useState } from 'react'
import authService from '../backend/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from '../store/productSlice'
import Loader from './Loader';
import { useForm } from 'react-hook-form'
function SignupForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false)
    async function signUpUser(data) {
        try {
            setError('');
            setLoader(true);
            const checkStorage = localStorage.getItem('user')
            if (checkStorage === 'true') {
                await authService.getLogOut();
            }
            const session = await authService.createAccount(data);
            if (session) {
                const session2 = await authService.getLogIn(data);
                if (session2) {
                    const crrUser = await authService.getCurrentUser();
                    dispatch(login(crrUser));
                    navigate('/');
                }
            }
        } catch (error) {
            setLoader(false)
            setError(error.message)
        }
    }
    return (
        <div>
            {
                loader ?
                    <Loader />
                    :
                    <form onSubmit={handleSubmit(signUpUser)}>
                        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                                <h2 className="text-3xl font-semibold mb-4 text-center text-blue-500">Sign Up</h2>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <p className="text-red-500 text-sm mb-4">{error}</p>
                                        <Link to='/login'><p className='text-lg'>Already have account?<span className='text-blue-500'>Log In</span></p></Link>
                                    </div>
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter your full name"
                                            {...register('name', {
                                                required: true
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter your email address"
                                            {...register('mail', {
                                                required: true,
                                                validate: {
                                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                        "Email address must be a valid address",
                                                }
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter your password"
                                            {...register('pass', {
                                                required: true
                                            })}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

            }

        </div>
    )
}

export default SignupForm
