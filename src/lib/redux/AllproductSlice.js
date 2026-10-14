import { createSlice } from '@reduxjs/toolkit'

const AllproductSlice = createSlice({
    name: 'products',

    initialState: {
        items: [],
    },

    reducers: {
        Allproduct: (state, action) => {
            state.items = action.payload

        },

       
    },
})

export const { Allproduct }=AllproductSlice.actions

export default AllproductSlice.reducer