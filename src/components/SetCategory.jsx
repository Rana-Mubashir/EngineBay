import React from 'react'
import databaseService from '../backend/database'
import ProductCard from './ProductCard'
import Loader from './Loader'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
function SetCategory({ category, relatedProductId, isrelatedProduct }) {
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true);
    const productName = useSelector((state) => state.product.productToFind)
    useEffect(() => {
        async function getProducts() {
            try {
                setLoader(true)
                const session = await databaseService.listAllProducts()
                if (productName) {
                    const filteredProducts = session.documents.filter((document) =>
                        document.name.toLowerCase() === productName.toLowerCase()
                    );
                    if (filteredProducts) {
                        setProducts(filteredProducts);
                        setLoader(false)
                    }
                }
                else {
                    if (session) {
                        if (Array.isArray(category)) {
                            const filteredProducts = session.documents.filter((document) =>
                                category.includes(document.category)
                            );
                            setProducts(filteredProducts)
                            setLoader(false)
                        } else {
                            const categoryFilter = session.documents.filter((document) =>
                                document.category === category
                            );
                            if (isrelatedProduct) {
                                const filterProduct = categoryFilter.filter((document) =>
                                    document.$id !== relatedProductId
                                )
                                console.log(filterProduct)
                                if (filterProduct) {
                                    setProducts(filterProduct)
                                    setLoader(false)
                                }
                            }
                            else {
                                setProducts(categoryFilter)
                                setLoader(false)
                            }

                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProducts();
    }, [productName, relatedProductId])
    return (
        <div className="">
            {
                loader ? (
                    <Loader />
                ) : (
                    <div>
                        {products && products.length > 0 ? (
                            <div className="flex justify-center items-center flex-wrap gap-20 p-10 ">
                                {products.map((each) => (
                                    <ProductCard key={each.$id} product={each} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center my-20 mx-5">
                                <h1 className="text-4xl text-red-600 font-bold mb-4">Sorry! Product is not available</h1>
                                <p className="text-lg text-gray-700 mb-6">We apologize for the inconvenience. The product you are looking for is currently not available. Please check back later or explore our other offerings.</p>
                            </div>
                        )}
                    </div>
                )
            }

        </div>
    )
}

export default SetCategory
