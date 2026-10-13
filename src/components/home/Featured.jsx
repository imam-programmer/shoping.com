import React from 'react'
import { cacheLife } from 'next/cache'
import Title from './hometitles/Title'
import ProductCart from '../common/ProductCart'
import Link from 'next/link'

async function getProducts() {
'use cache'
cacheLife('hours')

const data = await fetch('https://dummyjson.com/products?limit=200')

if (!data.ok) {
    throw new Error('Failed to fetch products')
}

const res = await data.json()
return res.products


}

const Featured = async () => {
const product = await getProducts()


return (
    <section className="mt-10 lg:mt-16 bg-[#F9FAFB] py-10 lg:py-16">
        <div className="container px-4 xl:px-0">
            <div className="mb-6 lg:mb-8 flex items-center justify-between gap-4">
                <Title title="Featured Products" />

                <Link
                    href="/category"
                    className="shrink-0 text-base font-medium leading-6 text-[#3B82F6]"
                >
                    View all
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {product.slice(0, 4).map((item) => (
                    <ProductCart key={item.id} item={item} />
                ))}
            </div>
        </div>
    </section>
)


}

export default Featured
