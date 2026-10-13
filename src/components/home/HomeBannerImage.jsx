"use client"
import React from 'react'
import homeBannerImg from "@/api/homebannerImageData.json"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules'
import "swiper/css"
import Image from 'next/image'

const HomeBannerImage = () => {
    return (
        <div className='h-full w-full'>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="mySwiper h-full w-full"
            >
                {homeBannerImg.map((item) => (
                    <SwiperSlide key={item.id} className='h-full! w-full'>
                        <Image
                            src={item.img}
                            width={500}
                            height={500}
                            alt={item.alt}
                            className='h-full w-full lg:object-cover'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HomeBannerImage