import Category from '@/components/home/Category'
import Deal from '@/components/home/Deal'
import Featured from '@/components/home/Featured'
import HomeBanner from '@/components/home/HomeBanner'
import Footer from '@/shared/Footer'
import Navbar from '@/shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <Navbar/>
      <HomeBanner/>
      <Category/>
      <Featured/>
      <Deal/>
      <Footer/>
    </div>
  )
}

export default page