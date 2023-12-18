'use client';

import React, { FC } from 'react';

import { AddUserGroudDetails, CompanyDetailsRoleCount } from '@/utils/types';

interface SelectProps extends React.HtmlHTMLAttributes<HTMLSelectElement> {
  required: boolean,
  options: AddUserGroudDetails[],
  value: string | undefined,
}

const CustomSelectUser: FC<SelectProps> = ({ required, options, value, ...props }) => {
  const selectedIndex = options.findIndex(option => option.email === value);

  if (selectedIndex !== -1) {
    const selectedOption = options.splice(selectedIndex, 1)[0];
    options.unshift(selectedOption);
  }

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
        {options.map(({ user_id, email }, index) => (
          <option value={user_id} key={index}>{email}</option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelectUser