import Link from 'next/link'
import React from 'react'
import HomeBannerImage from './HomeBannerImage'

const HomeBanner = () => {
    return (
        <div className='bg-linear-to-r from-blue-600 to-blue-800 py-10 sm:py-14 lg:py-22.5'>
            <div className='container flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-0 px-4 xl:px-0'>
                {/* banner text */}
                <div className='w-full lg:w-auto text-center md:text-left'>
                    <h1 className='text-4xl sm:text-5xl lg:text-[60px] font-bold capitalize leading-tight lg:leading-15 text-white mb-3'>
                        Summer Sale
                    </h1>
                    <p className='text-base sm:text-lg lg:text-[20px] font-normal leading-6 lg:leading-7 text-[#DBEAFE] mb-6 lg:mb-8'>
                        Up to 70% off on selected items. Limited time offer!
                    </p>
                    <Link href="/categories" className='py-3.5 px-6.5 text-[#2563EB] text-base font-semibold rounded-lg bg-white'>
                        Shop Now
                    </Link>
                </div>

                {/* banner images */}
                <div className='w-full md:w-100 lg:w-130 h-66 sm:h-102 md:h-60 lg:h-80 rounded-[10px] overflow-hidden shrink-0'>
                    <HomeBannerImage />
                </div>
            </div>
        </div>
    )
}

export default HomeBanner