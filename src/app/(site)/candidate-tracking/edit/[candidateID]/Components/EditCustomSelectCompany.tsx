'use client';

import React, { FC } from 'react';

import { CompanyDetailsRoleCount } from '@/utils/types';

interface SelectProps extends React.HtmlHTMLAttributes<HTMLSelectElement> {
  required: boolean,
  options: CompanyDetailsRoleCount[],
  value: string | undefined,
}

const EditCustomSelectCompany: FC<SelectProps> = ({ required, options, value, ...props }) => {
  const selectedIndex = options.findIndex(option => option.company_name === value);

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
        {options.map(({ company_id, company_name }, index) => (
          <option value={company_id} key={index}>{company_name}</option>
        ))}
      </select>
    </div>
  )
}

export default EditCustomSelectCompany