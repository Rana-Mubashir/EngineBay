import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AllProduct, BodyPartsCategory, Cart, DecoreCategory, Home, LoginForm, SignupForm, Product, SparePartCategory, CheckOutPage} from './components/index.js'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/',
        element: <AllProduct />
      },
      {
        path: '/bodyparts',
        element: <BodyPartsCategory />
      },
      {
        path: '/spareparts',
        element: <SparePartCategory />
      },
      {
        path: '/decoreparts',
        element: <DecoreCategory />
      },
      {
        path: '/product/:slug',
        element: <Product />
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path:'/cart',
        element:<Cart />
      },
      {
        path:'/checkout',
        element:<CheckOutPage />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
)
