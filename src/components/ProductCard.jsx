import React from 'react';
import databaseService from '../backend/database';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.$id}`}>
        <div className=" bg-white pb-5 max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-110 py-10">
            <img
                src={databaseService.getFilePre(product.imageId)}
                alt={product.name}
                className="w-full h-64 object-cover object-center"
            />
            <div className="p-4">
                <h3 className="text-gray-800 font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-red-600"> <del>${product.originalPrice}</del></span>
                    <span className="text-green-800 font-bold text-lg">${product.discountedPrice}</span>
                </div>
                <hr className="my-2" />
            </div>
        </div>
        </Link>

    );
};

export default ProductCard;
