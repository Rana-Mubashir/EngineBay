import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setProductToFind } from '../store/productSlice';
const CategoryBar = () => {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const popularSearches = [
        'Car Cover',
        'Compound Polish',
        'Front Grill',
        'Back Light',
        'Spoiler',
        'Front Bumper'
    ];
    function submitName(name) {
        setShowDropdown(false)
        dispatch(setProductToFind(name ? name : productName))
        setProductName('')
    }
    function emptySearchProduct() {
        dispatch(setProductToFind(''));
        setShowDropdown(false)
    }
    return (
        <>
            <div className="m-10 flex flex-col justify-center items-center gap-5">
                <h1 className='text-5xl text-center '>Explore Our Products</h1>
                <p className='text-center text-xl'>Explore our curated categories or find your desired product with ease through our search functionality.</p>
            </div>
            <div className="bg-gray-900 m-0 py-6  md:px-12 lg:px-24 gap-7 flex flex-wrap items-center justify-between border-b-2 border-t-2 border-black px-3">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            ` ${isActive ? "text-yellow-700" : "text-white"} " p-5 sm:p-2 border-white border-2 rounded font-semibold hover:text-gray-300 `
                        }
                        onClick={() => emptySearchProduct()}
                    >
                        All
                    </NavLink>

                    <NavLink
                        to="/decoreparts"
                        className={({ isActive }) =>
                            ` ${isActive ? "text-yellow-700" : "text-white"} "  py-5 sm:p-2 border-white border-2 rounded font-semibold hover:text-gray-300 `
                        }
                        onClick={() => emptySearchProduct()}
                    >
                        Decoration
                    </NavLink>

                    <NavLink
                        to="/bodyparts"
                        className={({ isActive }) =>
                            ` ${isActive ? "text-yellow-700" : "text-white"} " text-center p-2 border-white border-2 rounded font-semibold hover:text-gray-300`
                        }
                        onClick={() => emptySearchProduct()}
                    >
                        Body Parts
                    </NavLink>

                    <NavLink
                        to="/spareparts"
                        className={({ isActive }) =>
                            ` ${isActive ? "text-yellow-700" : "text-white"} " text-center p-2 border-white border-2 rounded font-semibold hover:text-gray-300 `
                        }
                        onClick={() => emptySearchProduct()}
                    >
                        Cleaning Items
                    </NavLink>
                </div>
                <div className="relative" >
                    <div className="flex items-center space-x-4 md:ml-auto relative">
                        <input
                            type="text"
                            placeholder="Search Product..."
                            className="bg-white text-gray-800 px-4 py-2 rounded-l-md focus:outline-none flex-1"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            onFocus={() => setShowDropdown(true)}
                        />
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-r-md"
                            onClick={() => submitName()}
                        >
                            Search
                        </button>
                    </div>
                    {showDropdown && (
                        <div className="absolute mt-2 w-full p-3 bg-white border border-gray-200 rounded-md shadow-lg z-10 ">
                            <div className="text-2xl text-red-500 text-end cursor-pointer"
                                onClick={() => setShowDropdown(false)}
                            >
                                X
                            </div>
                            <h1 className='text-xl underline '>Popular Searches</h1>
                            {popularSearches.map((value, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onMouseEnter={(e) => setProductName(e.target.innerText)}
                                    onMouseLeave={() => setProductName('')}
                                    onClick={() => submitName(value)}
                                >
                                    {search}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoryBar;
