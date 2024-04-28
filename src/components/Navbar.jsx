import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
const Navbar = () => {
    const user = useSelector((state) => state.product.user)
    const cartQuantity = useSelector((state) => state.product.productsInCart)
    return (
        <nav className="bg-gray-800 p-4 lg:p-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 lg:gap-5">
                    <a href="/" className="text-white text-lg lg:text-2xl font-bold">
                        EnGiNeBaY
                    </a>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block py-1 pr-2 pl-2 lg:py-2 lg:pr-4 lg:pl-3 duration-200 ${isActive ? "text-yellow-500" : "text-white"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        Home
                    </NavLink>
                </div>
                <div className="flex items-center gap-3 lg:gap-10">
                    <div className="relative">
                        <Link to={user && cartQuantity ? "/cart" : ''} className="text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 lg:h-8 lg:w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19c0 1.104.896 2 2 2s2-.896 2-2M5 5h14l2 10H3l2-10zm4 10V9m4 6V9"
                                />
                            </svg>
                            <div className="bg-red-500 rounded-full text-center absolute -top-1 -left-1 lg:-top-2 lg:-left-2">
                                <p className="text-sm px-1 lg:text-sm">{cartQuantity ? cartQuantity : 0}</p>
                            </div>
                        </Link>
                    </div>
                    {user ? (
                        <LogoutBtn />
                    ) : (
                        <Link to="/login">
                            <button className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-gray-200 lg:py-2 lg:px-4">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>


    );
};

export default Navbar;
