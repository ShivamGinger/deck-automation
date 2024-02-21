'use client';

import React, { FC } from 'react';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string,
  name: string,
  required: boolean,
  moveLabel: boolean,
  type: string,
  error?: boolean,
}

const Input: FC<InputProps> = ({ id, name, required, moveLabel, error, type, ...props }) => {

  return (
    <>
      <div className="w-72 mt-8">
        <div className="relative h-10 w-full min-w-[200px] ">
          <input
            type={type}
            {...(type === 'number' ? { min: 0, max: 100 } : {})}
            value={props.placeholder ? props.placeholder : ''}
            {...props}
            className={`
            ${error ? 'border-2 border-red-500 focus:border-red-500 focus:text-red-500 text-red-500 font-bold' : ''}
            peer 
            h-full 
            w-full 
            rounded-[7px]
            bg-transparent           
            px-3 
            py-2.5 
            font-sans 
            text-base 
            transition-all 
            text-gray-500
            focus:text-black
            focus:border-[#542C06]
            border 
            border-[#542C06]            
            focus:border-t-transparent 
            focus:outline-0 
            bg-[#FCECDD]
            `}
          />
          <label className={`
            pointer-events-none 
            absolute left-2 
            ${moveLabel ? '-top-6' : 'top-2'}
            flex h-full w-full 
            select-none 
            text-[16px] 
            leading-tight 
            transition-all 
            peer-focus:-top-2
            peer-focus:text-[14px]
            peer-focus:leading-tight 
            font-semibold
          `}>
            <span className={`${error ? 'text-red-500 font-bold' : ''}`}>{name}</span>&ensp;{required && <span className='text-red-600 font-bold'>*</span>}
          </label>
        </div>
      </div>
    </>
  )
}

export default Input