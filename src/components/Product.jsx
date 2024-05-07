import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from '../backend/database';
import CartBtn from './CartBtn';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import SetCategory from './SetCategory';
const ProductPage = () => {
    const user = useSelector((state) => state.product.user)
    const { slug } = useParams();
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        async function gettingPost() {
            try {
                const session = await databaseService.getProduct(slug);
                if (session) {
                    console.log(session)
                    setProduct(session);
                    setLoader(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        gettingPost();
    }, [slug])
    return (

        <div>
            { }
            <div className=''>
                {
                    loader ?
                        <Loader />
                        :
                        <div className="container mx-auto px-4 py-8">
                            <img
                                src={product.imageId ? databaseService.getFilePre(product.imageId) : ''}
                                alt={product.name}
                                className="w-full md:max-w-lg mx-auto"
                            />
                            <div className="mt-8">
                                <h1 className="text-3xl font-bold">{product.name}</h1>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eius sed quidem, eos magnam inventore maiores quisquam totam libero error excepturi beatae, architecto sunt laboriosam nesciunt quod vitae! Sapiente, voluptas.</p>
                                <p className="text-gray-600">Category: Product Category</p>
                                <div className="mt-4">
                                    <p className="text-lg font-bold text-green-600">
                                        Discounted Price: ${product.discountedPrice}
                                    </p>
                                    <p className="text-gray-600 line-through">Original Price:${product.originalPrice}</p>
                                    <div className="mt-4 flex items-center">
                                        <label className="text-gray-700">Quantity:</label>
                                        <div className="ml-4 flex items-center">
                                            <button
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                                                onClick={() => setQuantity((prev) => prev > 1 ? --prev : prev)}
                                            >
                                                -
                                            </button>
                                            <span className="bg-gray-100 px-3 py-1">{quantity}</span>
                                            <button
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r"
                                                onClick={() => setQuantity((prev) => prev < 6 ? ++prev : prev)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        user ?
                                            ''
                                            :
                                            <p className='text-red-500 text-lg animate-bounce'>{user ? '' : 'Please log in first to secure your cart items.'}</p>
                                    }
                                    {
                                        user ?
                                            <CartBtn
                                                product={product}
                                                quantity={quantity}
                                            />
                                            :
                                            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Add to Cart
                                            </button>
                                    }

                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className="">
                <div className="flex justify-center items-center m-5">
                    <h1 className='text-3xl md:text-5xl underline'>Related Products</h1>
                </div>
                <div className="">
                    {
                        loader ?
                            <Loader />
                            :
                            <SetCategory
                                category={product.category}
                                relatedProductId={product.$id}
                                isrelatedProduct={true}
                            />
                    }
                </div>

            </div>
        </div>

    );
};

export default ProductPage;
