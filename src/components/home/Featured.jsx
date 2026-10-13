import React from 'react'
import Title from './hometitles/Title'
import ProductCart from '../common/ProductCart'
import Link from 'next/link'

const Featured = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=200")
    const res = await data.json()
    const product=res.products

    return (
        <section className='mt-16 pt-16 bg-[#F9FAFB]'>
            <div className='container'>
                <div className='flex justify-between mb-8'>
                    <Title title="Featured Products" />
                    <Link href="/category" className='text-base font-medium leading-6 text-[#3B82F6]'>View all</Link>
                </div>
                <div className='grid grid-cols-4 gap-5 '>
                {
                    product.slice(0,4).map((item) => (
                      <ProductCart key={item.id} item={item}/>
                    ))
                }

                </div>
            </div>
        </section>
    )
}

export default Featured