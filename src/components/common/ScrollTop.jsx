"use client"
import React from 'react'
import ScrollToTop from 'react-scroll-to-top'

const ScrollTop = () => {
  return (
    <div>
        <ScrollToTop smooth color="blue" style={{ 
          backgroundColor: '#51dc26', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%'
        }}/>
    </div>
  )
}

export default ScrollTop