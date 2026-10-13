import Footer from '@/shared/Footer'
import Navbar from '@/shared/Navbar'
import React from 'react'

const layout = ({children}) => {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}

export default layout