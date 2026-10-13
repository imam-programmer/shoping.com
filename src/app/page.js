import Category from '@/components/home/Category'
import Featured from '@/components/home/Featured'
import HomeBanner from '@/components/home/HomeBanner'
import Navbar from '@/shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <Navbar/>
      <HomeBanner/>
      <Category/>
      <Featured/>
    </div>
  )
}

export default page