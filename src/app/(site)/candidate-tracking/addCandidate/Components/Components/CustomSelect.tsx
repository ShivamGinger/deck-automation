'use client';

import React, { FC } from 'react';

interface SelectProps extends React.HtmlHTMLAttributes<HTMLSelectElement> {
  required: boolean,
  options: {
    value: string,
    text: string
  }[],
  value: string
}

const CustomSelect: FC<SelectProps> = ({ required, options, value, ...props }) => {
  return (
    <div className=''>
      <select
        {...props}
        value={value ? value : undefined}
        required
        className={`
          w-full
          rounded-md
          px-3 
          py-1.5 
          font-sans 
          text-base 
          transition-all 
          text-gray-500
          focus:text-black
          focus:border-[#542C06]
          border 
          border-[#542C06]
        `}>
        {options.map(({ value, text }, index) => (
          <option value={value} key={index}>{text}</option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect