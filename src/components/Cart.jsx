import React, { useEffect, useState } from 'react'
import databaseService from '../backend/database'
import { useSelector } from 'react-redux'
import CartForm from './CartForm'
import Loader from './Loader'
import TotalBill from './TotalBill'
import { useNavigate } from 'react-router-dom'
function Cart() {
    const [product, setProducts] = useState([])
    const [productIdAtCart, setProductIdAtCart] = useState([]);
    const [quantity, setQuantity] = useState([])
    const [loader, setLoader] = useState();
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.product.userdata)
    const usermail = userdata.providerUid
    const cartQuantity = useSelector((state) => state.product.productsInCart)
    useEffect(() => {
        async function getProducts() {
            try {
                setLoader(true)
                const session = await databaseService.cartDetails()
                if (session) {
                    const data = session.documents.filter((document) => document.userMail === usermail)
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            for (let j = i + 1; j < data.length; j++) {
                                if (data[i].documentId === data[j].documentId) {
                                    data[i].quantity += data[j].quantity
                                    const updatedQuantity = data[i].quantity;
                                    const updateCart = await databaseService.updateCart(
                                        data[i].$id,
                                        data[i].documentId,
                                        data[i].userMail,
                                        updatedQuantity
                                    )
                                    if (updateCart) {
                                        const delrepeatElm = await databaseService.delCart(data[j].$id)
                                        if (delrepeatElm) {
                                            data.splice(j, 1)
                                        }
                                    }
                                }
                            }
                        }
                        const promise = data.map(async (item) => {
                            setQuantity((prev) => [item.quantity,...prev ])
                            setProductIdAtCart((prev) => [item.$id,...prev])
                            const eachProduct = await databaseService.getProduct(item.documentId)
                            return eachProduct;
                        })
                        const resolvedProducts = await Promise.all(promise);
                        if (resolvedProducts) {
                            resolvedProducts.reverse()
                            setProducts(resolvedProducts)
                            setLoader(false)
                        }
                    }
                    else {
                        navigate('/')
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProducts()
    }, [cartQuantity])
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <div>
                        <div className="text-center m-5">
                            <h1 className='text-4xl underline '>Cart Products</h1>
                        </div>
                        {
                            usermail && product.length > 0 ?
                                product.map((eachProduct, index) =>

                                    <CartForm
                                        key={index}
                                        product={eachProduct}
                                        quantity={quantity[index]}
                                        productId={productIdAtCart[index]}
                                    />
                                )

                                : 'No  products'
                        }
                        <div className="">
                            <TotalBill
                                product={product}
                                quantity={quantity}
                            />
                        </div>
                    </div>
            }
        </>

    )
}

export default Cart
