import Category from '@/components/home/Category'
import HomeBanner from '@/components/home/HomeBanner'
import Navbar from '@/shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <Navbar/>
      <HomeBanner/>
      <Category/>
    </div>
  )
}

export default page