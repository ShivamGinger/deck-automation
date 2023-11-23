'use client';

import { RoleDetails } from '@/utils/types';
import React, { FC } from 'react';

interface SelectProps extends React.HtmlHTMLAttributes<HTMLSelectElement> {
  required: boolean,
  options: RoleDetails[],
  value: string | undefined,
}

const EditCustomSelectRole: FC<SelectProps> = ({ required, options, value, ...props }) => {
  const selectedIndex = options.findIndex(option => option.role_name === value);

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
        {options.map(({ role_id, role_name }, index) => (
          <option value={role_id} key={index}>{role_name}</option>
        ))}
      </select>
    </div>
  )
}

export default EditCustomSelectRole