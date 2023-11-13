'use client';

import React, { FC } from 'react';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string,
  required: boolean,
  moveLabel: boolean,
  error: boolean,
}

const Input: FC<InputProps> = ({ id, required, moveLabel, error, ...props }) => {

  return (
    <>
      <div className="w-20">
        <div className="relative h-10 ">
          <input
            type="number"
            min={1}
            max={5}
            value={props.placeholder}
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
            focus:outline-0 
            bg-[#FCECDD]
            `}
          />
        </div>
      </div>
    </>
  )
}

export default Input