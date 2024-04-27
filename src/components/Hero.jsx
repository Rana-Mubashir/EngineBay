import React from 'react';
import image from '../images/heroImage.jpg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HeroSection = () => {
    const user = useSelector((state) => state.product.user);
    return (
        <div
            className="mt-2 relative bg-cover bg-center text-white py-32 px-6 md:px-12 lg:px-24 mx-8 lg:my-12"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '400px',
                padding: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="max-w-4xl mx-auto text-center p-4">
                <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold mb-8">
                    Welcome to <span className='text-red-900  lg:border-2 border-white'>EnGiNeBaY</span>
                </h1>


                <p className="text-lg md:text-3xl mb-8">
                    Explore our amazing collection of products and find what you need.
                </p>
                <Link to={user ? '' : './signup'}>
                    <button className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>



    );
};

export default HeroSection;
