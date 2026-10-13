import Image from 'next/image'
import React from 'react'

const ProductCart = ({ item }) => {
return ( <div className="flex h-full min-h-90 w-full flex-col rounded-lg bg-white p-4">


        <Image
            src={item.thumbnail}
            alt={item.title}
            width={500}
            height={500}
            className="mx-auto h-48 w-full object-contain"
        />

        <h3 className="mt-4 line-clamp-1 font-semibold text-[#111827]">
            {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm font-normal text-[#4B5563]">
            {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
            <h4 className="text-[20px] font-bold leading-7 text-[#111827]">
                ${item.price?.toFixed(2) ?? '99.99'}
            </h4>

            <button
                type="button"
                aria-label={`Add ${item.title} to cart`}
                className="flex h-10 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#3B82F6]"
            >
                <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 0.75C0 0.334 0.334 0 0.75 0H2.17C2.86 0 3.47 0.4 3.75 1H16.6C17.42 1 18.02 1.78 17.8 2.58L16.52 7.33C16.26 8.32 15.37 9 14.35 9H5.33L5.5 9.89C5.57 10.24 5.88 10.5 6.24 10.5H15.25C15.67 10.5 16 10.83 16 11.25S15.67 12 15.25 12H6.24C5.16 12 4.23 11.23 4.03 10.17L2.42 1.7C2.4 1.58 2.29 1.5 2.17 1.5H0.75C0.33 1.5 0 1.17 0 0.75ZM5.5 13C6.33 13 7 13.67 7 14.5S6.33 16 5.5 16 4 15.33 4 14.5 4.67 13 5.5 13ZM14.5 13C15.33 13 16 13.67 16 14.5S15.33 16 14.5 16 13 15.33 13 14.5 13.67 13 14.5 13Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>
    </div>
)


}

export default ProductCart
