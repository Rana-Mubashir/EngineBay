import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import databaseService from '../backend/database'
import { onChangeCart } from '../store/productSlice';
function CartBtn({ product, quantity }) {
    const [loader, setLoader] = useState(false)
    const cartQuantity = useSelector((state) => state.product.productsInCart)
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.product.userdata)
    const usermail = userdata.email;
    async function handlesubmit(documentId, userMail, quantity) {
        try {
            setLoader(true)
            const session = await databaseService.addCart(documentId, userMail, quantity)
            if (session) {
                setLoader(false)
                dispatch(onChangeCart((cartQuantity + quantity)))
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div>
            {
                loader ?
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Loading...
                    </button>
                    :
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handlesubmit(product.$id, usermail, quantity)}
                    >
                        Add to Cart
                    </button>

            }

        </div>
    )
}

export default CartBtn
