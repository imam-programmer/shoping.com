"use client";

import React, { useEffect, useState } from "react";
import homeBannerImg from "@/api/homebannerImageData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const HomeBannerImage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full" />;
  }

  return (
    <div className="h-full w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={homeBannerImg.length > 1}
        slidesPerView={1}
        className="h-full w-full"
      >
        {homeBannerImg.map((item) => (
          <SwiperSlide key={item.id} className="h-full w-full">
            <Image
              src={item.img}
              width={500}
              height={500}
              alt={item.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBannerImage;