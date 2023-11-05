import getAllCompanies from '@/lib/companies';

import React from 'react';

import Link from 'next/link';
import RenderCompanies from './Components/RenderCompanies';

const Companies = async () => {
  const companies = await getAllCompanies();

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        <h2>List of Companies</h2>
        {companies.length === 0 ?
          <>
            <div className='overflow-x-auto bg-white p-2'>
              Add Company? <Link href={'/companies/addCompany'} className='underline text-blue-500'>Click here</Link>
            </div>
          </>
          :
          <RenderCompanies companies={companies} />
        }
      </div>
    </section>
  )
}

export default Companies