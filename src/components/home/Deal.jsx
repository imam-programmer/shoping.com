// import React from 'react'
// import Title from './hometitles/Title'
// import Dealbox from './dealbox/Dealbox'

// const Deal = () => {
//     return (
//         <section className='mt-16'>
//             <div className='container'>
//                 <Title className="text-center mb-8" title="Today's Deals" />
//                 <div className=' flex justify-between'>

//                 <Dealbox h2="Flash Sale" p="Up to 50% off electronics" button="Shop Now" btn="text-red-500" className=" bg-gradient-to-r from-red-500 to-pink-500"/>
//                 <Dealbox h2="Free Shipping" p="On orders over $50" button="Learn More" btn="text-green-500" className=" bg-gradient-to-r from-green-500 to-teal-500"/>
//                 <Dealbox h2="Member Exclusive" p="Extra 20% off for members" button="Join Now" btn="text-purple-500" className=" bg-gradient-to-r from-purple-500 to-indigo-500"/>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Deal

import React from 'react'
import Title from './hometitles/Title'
import Dealbox from './dealbox/Dealbox'

const Deal = () => {
    return (
        <section className='mt-10 lg:mt-16'>
            <div className='container px-4 xl:px-0'>
                <Title className="text-center mb-6 lg:mb-8" title="Today's Deals" />
                <div className='flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0'>
                    <Dealbox h2="Flash Sale" p="Up to 50% off electronics" button="Shop Now" btn="text-red-500" className="bg-linear-to-r from-red-500 to-pink-500" />
                    <Dealbox h2="Free Shipping" p="On orders over $50" button="Learn More" btn="text-green-500" className="bg-linear-to-r from-green-500 to-teal-500" />
                    <Dealbox h2="Member Exclusive" p="Extra 20% off for members" button="Join Now" btn="text-purple-500" className="bg-linear-to-r from-purple-500 to-indigo-500" />
                </div>
            </div>
        </section>
    )
}

export default Deal