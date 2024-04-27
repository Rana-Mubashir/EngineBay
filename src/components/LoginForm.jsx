import React from 'react'
import { useState, useEffect } from 'react';
import authService from '../backend/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login, onChangeCart } from '../store/productSlice'
import Loader from './Loader'
import databaseService from '../backend/database';
import { useForm } from 'react-hook-form';
function LoginForm() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const userdata = useSelector((state) => state.product.userdata)
    const usermail = userdata.providerUid
    const navigate = useNavigate();
    useEffect(() => {
        // purpose of this fucntion is to update cart icon on navbar ,when user login.
        async function getCartQuantity() {
            try {
                const session = await databaseService.cartDetails();
                if (session && usermail) {
                    const data = session.documents.filter((document) => document.userMail === usermail)
                    if (data.length > 0) {
                        data.map((item) => {
                            setQuantity((prev) => prev + item.quantity);
                        })
                    }
                    else {
                        navigate('/')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getCartQuantity();
    }, [usermail])
    useEffect(() => {
        if (quantity) {
            dispatch(onChangeCart(quantity));
            navigate('/')
        }
    }, [quantity])
    async function loginUser(data) {
        try {
            setError('')
            setLoader(true);
            const session = await authService.getLogIn(data);
            if (session) {
                dispatch(login(session));
            }
        } catch (error) {
            setLoader(false)
            console.log(error);
            setError(error.message)
        }
    }
    return (
        <div>
            {
                loader ?
                    <Loader />
                    :
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                                <h2 className="text-4xl font-semibold mb-4 text-center text-blue-500">Login</h2>
                                <p className="text-red-500 text-sm mb-4">{error}</p>
                                <Link to='/signup'><p className='text-xl p-5'>Does not have account?<span className='text-blue-500'>Sign up</span></p></Link>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-4  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                        <label htmlFor="password" className="block text-xl font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                            Login
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

export default LoginForm
