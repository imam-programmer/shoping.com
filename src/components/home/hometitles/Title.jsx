import React from 'react'

const Title = ({title,className}) => {
  return (
    <h2 className={`text-[#111827] text-[30px] font-bold leading-9 ${className} `}>{title}</h2>
  )
}

export default Title