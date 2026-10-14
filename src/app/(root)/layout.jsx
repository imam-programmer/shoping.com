import Breadcrumb from '@/components/common/Breadcrumb'
import Footer from '@/shared/Footer'
import Navbar from '@/shared/Navbar'
import React, { Suspense } from 'react'

const layout = ({children}) => {
  return (
    <>
    <Navbar/>
    <Suspense fallback={null}>
    <Breadcrumb />
</Suspense>
    {children}
    <Footer/>
    </>
  )
}

export default layout