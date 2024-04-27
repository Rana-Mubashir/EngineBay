import {configureStore } from '@reduxjs/toolkit'
import productSliceReducer from './productSlice'
const store =configureStore({
    reducer:{
       product:productSliceReducer
    }
})
export default store