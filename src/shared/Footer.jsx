import React from 'react'
import Link from 'next/link'
import quickLinks from "@/api/navData.json"
import customerService from "@/api/footerCustomerserviceData.json"


const FooterLinks = ({ title, links }) => (
    <div>
        <h3 className='text-base font-semibold text-white mb-4'>{title}</h3>
        <ul className='flex flex-col gap-y-2'>
            {links.map((item) => (
                <li key={item.id}>
                    <Link
                        href={item.path}
                        className='text-sm font-normal text-[#9CA3AF] hover:text-white transition-colors'
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

const Footer = () => {
    return (
        <footer className='bg-[#111827] pt-12 pb-8 mt-16'>
            <div className='container px-4 xl:px-0'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* brand + socials */}
                    <div>
                        <h2 className='text-xl font-bold text-white mb-4'>ShopHub</h2>
                        <p className='text-sm font-normal text-[#9CA3AF] mb-4 max-w-56'>
                            Your one-stop shop for everything you need.
                        </p>
                        <div className='flex items-center gap-x-4 text-white'>
                            <Link href='#' aria-label='Facebook'>
                                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                                </svg>
                            </Link>
                            <Link href='#' aria-label='Twitter'>
                                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
                                </svg>
                            </Link>
                            <Link href='#' aria-label='Instagram'>
                                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                                    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                                    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <FooterLinks title='Quick Links' links={quickLinks} />
                    <FooterLinks title='Customer Service' links={customerService} />

                    {/* newsletter */}
                    <div>
                        <h3 className='text-base font-semibold text-white mb-4'>Newsletter</h3>
                        <p className='text-sm font-normal text-[#9CA3AF] mb-4'>
                            Subscribe for updates and deals
                        </p>
                        <form className='flex w-full'>
                            <input
                                type='email'
                                placeholder='Your email'
                                aria-label='Your email'
                                className='min-w-0 flex-1 rounded-l-lg bg-white px-4 py-2 text-sm text-[#111827] placeholder:text-[#ADAEBC] outline-none'
                            />
                            <button
                                type='submit'
                                className='shrink-0 rounded-r-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-[#2563EB] transition-colors'
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* copyright */}
                <p className='mt-8 lg:mt-12 text-center text-sm font-normal text-[#9CA3AF]'>
                    © 2024 ShopHub. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer