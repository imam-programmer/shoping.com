import React from 'react'

const Dealbox = ({ className, btn, h2, p, button }) => {
    return (
        <div className={`w-full lg:w-97.5 h-auto lg:h-42 rounded-lg p-6 ${className}`}>
            <h2 className='text-xl lg:text-[24px] font-bold leading-8 text-white mb-2'>{h2}</h2>
            <p className='text-base font-normal leading-6 text-white mb-4'>{p}</p>

            <button className={`text-base font-semibold bg-white py-2.5 px-4.5 rounded-lg cursor-pointer ${btn}`}>
                {button}
            </button>
        </div>
    )
}

export default Dealbox