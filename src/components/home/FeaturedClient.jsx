'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProductCart from '../common/ProductCart'
import { Allproduct } from '@/lib/redux/AllproductSlice'

export default function FeaturedClient({ initialProducts }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Allproduct(initialProducts))
    }, [ initialProducts])

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {initialProducts.slice(0, 4).map((item) => (
                <ProductCart key={item.id} item={item} />
            ))}
        </div>
    )
}