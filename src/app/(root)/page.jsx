import Category from '@/components/home/Category'
import Deal from '@/components/home/Deal'
import Featured from '@/components/home/Featured'
import HomeBanner from '@/components/home/HomeBanner'
import React from 'react'

const page = () => {
  return (
     < >
      <HomeBanner/>
      <Category/>
      <Featured/>
      <Deal/>
    </>
  )
}

export default page