"use client";

import Link from 'next/link';

import React, { useLayoutEffect, useState } from 'react';

import RenderRolesUnderCompany from './Components/RenderRolesUnderCompany';

import getAllRolesUnderCompany from '@/lib/roles';
import { useParams } from 'next/navigation';

import { Role } from '@/db/schema';

const RolesUnderCompany = () => {

  const { companyID } = useParams();

  const [rolesUnderCompany, setRolesUnderCompany] = useState<Role[]>();

  useLayoutEffect(() => {
    const getData = async () => {
      const data = await getAllRolesUnderCompany(companyID);

      setRolesUnderCompany(data);
    }
    getData();
  }, [companyID]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        <h2>List of Roles under {companyID}</h2>
        {rolesUnderCompany?.length === 0 || !rolesUnderCompany ?
          <>
            <div className='overflow-x-auto bg-white p-2'>
              Add Role? <Link href={`/companies/${companyID}/addRole`} className='underline text-blue-500'>Click here</Link>
            </div>
          </>
          :
          <RenderRolesUnderCompany rolesUnderCompany={rolesUnderCompany} />
        }
      </div>
    </section>
  )
}

export default RolesUnderCompany