import { createSlice } from '@reduxjs/toolkit'

const AddtoCartSlice = createSlice({
    name: 'cart',

    initialState: {
        items: [],
    },

    reducers: {
        AddtoCart: (state, action) => {
            const product = action.payload

            const existingItem = state.items.find(
                (item) => item.id === product.id
            )

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({
                    ...product,
                    quantity: product.quantity || 1,
                })
            }
        },

        setCart: (state, action) => {
            state.items = action.payload
        },

        RemoveFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        },

        UpdateQuantity: (state, action) => {
            const { id, quantity } = action.payload

            const item = state.items.find(
                (product) => product.id === id
            )

            if (item && quantity >= 1) {
                item.quantity = quantity
            }
        },

        ClearCart: (state) => {
            state.items = []
        },
    },
})

export const {
    AddtoCart,
    setCart,
    RemoveFromCart,
    UpdateQuantity,
    ClearCart,
} = AddtoCartSlice.actions

export default AddtoCartSlice.reducer


