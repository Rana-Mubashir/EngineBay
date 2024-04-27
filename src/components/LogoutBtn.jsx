import React from 'react'
import authService from '../backend/auth'
import { useDispatch } from 'react-redux';
import { logout, onChangeCart } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';
function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleLogout() {
        try {
            const session = await authService.getLogOut();
            if (session) {
                dispatch(logout());
                dispatch(onChangeCart(0))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-200"
                onClick={() => handleLogout()}
            >
                Logout
            </button>
        </div>
    )
}

export default LogoutBtn
