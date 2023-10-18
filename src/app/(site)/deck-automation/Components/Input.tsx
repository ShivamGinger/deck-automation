'use client';

import React, { FC } from 'react';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string,
  name: string,
  required: boolean,
  moveLabel: boolean,
}

const Input: FC<InputProps> = ({ id, name, required, moveLabel, ...props }) => {

  return (
    <>
      <div className="w-72">
        <div className="relative h-10 w-full min-w-[200px]">
          <input
            value={props.placeholder}
            {...props}
            className={`
            peer 
            h-full 
            w-full 
            rounded-[7px]
            border
            bg-transparent 
            ${moveLabel && 'border-t-transparent'}
            px-3 
            py-2.5 
            font-sans 
            text-sm 
            font-normal 
            transition-all 
            text-gray-400
            focus:border-2 
            focus:border-red-500 
            focus:text-black 
            focus:border-t-transparent 
            focus:outline-0 
            `}
          />
          <label className={`
            pointer-events-none 
            absolute left-2 
            ${moveLabel ? '-top-2' : 'top-2'}
            flex h-full w-full 
            select-none 
            text-[16px] font-normal 
            leading-tight 
            transition-all 
            peer-focus:-top-2
            peer-focus:text-[12px]
            peer-focus:leading-tight 
            peer-focus:text-red-500 
          `}>
            {name}&ensp;{required && <span className='text-red-600 font-bold'>*</span>}
          </label>
        </div>
      </div>
    </>
  )
}

export default Input