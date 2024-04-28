import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import databaseService from '../backend/database'
import { onChangeCart } from '../store/productSlice'
import { useNavigate } from 'react-router-dom'
const CheckoutPage = ({ }) => {
  const totalPrice = useSelector((state) => state.product.TotalPrice)
  const userdata = useSelector((state) => state.product.userdata);
  const userMail = userdata.providerUid
  const [error, setError] = useState('');
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState()
  const [phone, setPhone] = useState('')
  const [confirmation, setConfirm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSubmit() {
    setError('');
    try {
      if (country && city && address && phone && userMail) {
        const session = await databaseService.emptyCart(userMail)
        if (session) {
          setConfirm('Order confirmed,Check your email.');
          dispatch(onChangeCart(0))
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }
      else {
        setError("Required field ")
        return false;
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (

    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-semibold mb-2">Country Name</label>
        <input type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          name="country"
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-semibold mb-2">City Name</label>
        <input type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-semibold mb-2">Address</label>
        <textarea name="address" rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full resize-none focus:outline-none focus:border-blue-500"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="mobile" className="block text-sm font-semibold mb-2">Mobile Number</label>
        <input type="tel" name="mobile"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-6">
        <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
      </div>
      <p className="mb-4 text-sm">We accept cash on delivery. Please have the exact amount ready for payment.</p>
      <p className='text-lg text-red-500'>{error}</p>
      <p className='text-lg text-green-800 mb-3'>{confirmation} </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
        onClick={() => handleSubmit()}
      >
        Done
      </button>
    </div>
  );
};

export default CheckoutPage;
