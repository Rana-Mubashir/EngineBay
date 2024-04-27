import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setTotalPrice } from '../store/productSlice';
const BillPage = ({ product, quantity }) => {
    const dispatch=useDispatch();
    const [price, setPrice] = useState(0)
    useEffect(() => {
        product.map((item, index) =>
            setPrice((prev) => prev + item.discountedPrice * quantity[index])
        )
    }, [])
    useEffect(()=>{
        dispatch(setTotalPrice(price));
    },[price])
    return (
        <div className="container mx-auto m-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-4">Your Bill</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
                <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-xl font-bold mb-2">Total Products</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <p className="font-semibold">Product </p>
                        <p className="font-semibold">Quantity</p>
                        <p className='font-semibold'>Price</p>
                        <p className="font-semibold">Total Price</p>
                        {
                            product.map((item, index) =>
                                <>
                                    <p>{item.name}</p>
                                    <p>{quantity[index]}</p>
                                    <p>{item.discountedPrice}</p>
                                    <p>${item.discountedPrice * quantity[index]}</p>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
            <div className="bg-white shadow sm:rounded-lg mb-4">
                <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-xl font-bold mb-2">Total Price</h2>
                    <p className="text-lg font-bold">${price}</p>
                </div>
            </div>
            <p className="mb-4">
                Proceed to checkout to complete your purchase.
            </p>
            <Link
                to="/checkout"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
            >
                Proceed to Checkout
            </Link>
        </div>
    );
};

export default BillPage;
