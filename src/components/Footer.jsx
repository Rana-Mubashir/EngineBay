import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col mb-8 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">EnGiNeBaY</h2>
                        <p className="text-sm">Explore our wide range of products and find what you need.</p>
                    </div>
                    <div className="flex flex-col mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="text-sm">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19c-1.95 0-3.74-.72-5.12-1.9l-4.67 2.06a.508.508 0 0 1-.7-.52V4.42c0-.22.14-.42.35-.52l9-4a.511.511 0 0 1 .67.5v16.15a.5.5 0 0 1-.25.43l-4.5 2c-.49.22-1.05.32-1.62.32zM20 9.42v5.16c0 .16-.08.31-.21.4a3.43 3.43 0 0 1-3.29.02C15.09 15.1 13.6 15 12 15s-3.08.1-4.5.6a3.43 3.43 0 0 1-3.29-.02.418.418 0 0 1-.21-.4v-5.16m0 0c0-.34.03-.67.1-1h0c.45-.89 1.26-1.5 2.21-1.58l.84-.07c.32 0 .64.04.95.1l.74-.52a4.126 4.126 0 0 1 1.48-1.08l.84-.29c.23-.08.48-.13.73-.15 1.05-.16 2.15.09 3.09.69h0c.14.09.27.2.38.34l.7.84c.34.41.51.93.47 1.48"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 0 1-9 9H3v-2m0-4v-4a9 9 0 0 1 9-9h6v2m0 4v4a9 9 0 0 1-9 9"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 0 1-9 9H3v-2m0-4v-4a9 9 0 0 1 9-9h6v2m0 4v4a9 9 0 0 1-9 9"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-t border-gray-600" />
                <p className="text-sm text-center">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
