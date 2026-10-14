'use client'

import { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './lib/redux/Store'
import { setCart } from './lib/redux/AddtoCartSlice'

function CartPersistence({ children }) {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.cart.items)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart')

            if (savedCart) {
                const parsedCart = JSON.parse(savedCart)

                if (Array.isArray(parsedCart)) {
                    dispatch(setCart(parsedCart))
                }
            }
        } catch (error) {
            console.error('Failed to load cart:', error)
        } finally {
            setLoaded(true)
        }
    }, [dispatch])

    // Cart load শেষ হওয়ার পরেই save হবে
    useEffect(() => {
        if (!loaded) return

        try {
            localStorage.setItem('cart', JSON.stringify(items))
        } catch (error) {
            console.error('Failed to save cart:', error)
        }
    }, [items, loaded])

    return children
}

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <CartPersistence>
                {children}
            </CartPersistence>
        </Provider>
    )
}
