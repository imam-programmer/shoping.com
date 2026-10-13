"use client"

import React, { useState } from 'react'
import navData from "@/api/navData.json"
import SearchSVG from '@/svgs/SearchSVG'
import CartSVG from '@/svgs/CartSVG'
import UserSVG from '@/svgs/UserSVG'
import MenuSVG from '@/svgs/MenuSVG'
import MenuXSVG from '@/svgs/MenuXSVG'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const Navbar = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    function handlenavLink(link){
        router.push(link)
        setOpen(false)
    }
    return (
        <header>
            <nav className='container flex flex-wrap lg:flex-nowrap justify-between items-center gap-y-3 my-3 px-4 xl:px-0'>
                {/* logo + links (desktop) + hamburger (mobile) */}
                <div className='flex items-center gap-x-3 lg:gap-x-8 shrink-0'>
                    {/* hamburger: mobile only */}
                    <button
                        type='button'
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        className='lg:hidden p-1 -ml-1 text-[#374151] cursor-pointer'
                    >
                        {open ? (
                            <MenuSVG className="h-6 w-6" />
                        ) : (
                            <MenuXSVG className='h-6 w-6' />
                        )}
                    </button>

                    <h2 className='text-[24px] font-bold'>ShopHub</h2>

                    {/* desktop links */}
                    <ul className='hidden lg:flex items-center gap-x-8'>
                        {navData.map((item) =>
                            <Link href={item.path} className='text-base cursor-pointer text-[#374151] font-normal' key={item.id}>{item.title}</Link>
                        )}
                    </ul>
                </div>

                {/* search: full-width second row on mobile, inline on desktop */}
                <div className='order-last lg:order-0 flex items-center relative w-full lg:mx-20.25 py-2.5 border border-[#d1d5db] rounded-[10px] px-3 gap-3.25'>
                    <SearchSVG className="h-4 w-4 shrink-0" />
                    <input type="text" placeholder='Search products...' className='placeholder:text-[#ADAEBC] w-full outline-none' />
                </div>

                {/* cart and user */}
                <div className='flex items-center gap-5 lg:gap-8 shrink-0'>
                    <div className='relative'>
                        <CartSVG className="h-5 w-[22.5px] cursor-pointer" />
                        <span className='h-5 w-5 absolute bg-[#EF4444] flex items-center justify-center rounded-full text-[12px] text-white -top-5 -right-3'>3</span>
                    </div>
                    <UserSVG className="h-5 w-[17.5px] cursor-pointer" />
                </div>
            </nav>

            {/* mobile menu */}
            {open && (
                <ul className='lg:hidden container px-4 xl:px-0 pb-3 flex flex-col'>
                    {navData.map((item) =>
                        <button onClick={() => handlenavLink(item.path)}
                            key={item.id}
                            className='py-3 border-b border-[#e5e7eb] text-base cursor-pointer text-[#374151] font-normal text-start'
                        >
                            {item.title}
                        </button>
                    )}
                </ul>
            )}
        </header>
    )
}

export default Navbar