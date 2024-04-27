import React, { useState } from 'react';
import databaseService from '../backend/database';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeCart } from '../store/productSlice';
import Loader from './Loader'
function CartForm({ product, quantity, productId }) {
    const cartQuantity = useSelector((state) => state.product.productsInCart)
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    async function handleDel(productId) {
        try {
            setLoader(true);
            const session = await databaseService.delCart(productId)
            if (session) {
                dispatch(onChangeCart((cartQuantity - quantity)))
                setLoader(false);
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <div className="max-w-4xl mx-auto p-4">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="flex items-center border-b border-gray-200 p-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4">
                                    <img src={product ? databaseService.getFilePre(product.imageId) : ''} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="font-semibold">{product.name}</h2>
                                    <div className="text-sm text-gray-500">
                                        <span className="line-through">${product.originalPrice}</span>
                                        <span className="ml-2">${product.discountedPrice}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="w-16 h-8 border border-gray-300 rounded-md text-center">{quantity}</p>
                                    <button type="button" className="text-red-600 hover:text-red-800 ml-2"
                                        onClick={() => handleDel(productId)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>

    );
}

export default CartForm;
