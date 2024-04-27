import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: false,
    userdata: {},
    productsInCart: 0,
    TotalPrice:0,
    productToFind:0
}
const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
       login: (state,action) => {
            state.user=true
            state.userdata=action.payload
        },
        logout: (state)=>{
            state.user=false
            state.userdata=''
        },
        onChangeCart:(state,action)=>{
          state.productsInCart=action.payload
        },
        setTotalPrice:(state,action)=>{
            state.TotalPrice=action.payload
        },
        setProductToFind :(state,action)=>{
            state.productToFind=action.payload
        }

    }
})
export const { login,logout ,onChangeCart,setTotalPrice,setProductToFind} = productSlice.actions
export default productSlice.reducer