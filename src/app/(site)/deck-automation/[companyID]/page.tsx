"use client";

import Link from 'next/link';

import React, { useLayoutEffect, useState } from 'react';

import RenderRolesUnderCompany from './Components/RenderRolesUnderCompany';

import getAllRolesUnderCompany from '@/lib/roles';
import { useParams } from 'next/navigation';

import { Role } from '@/db/schema';

type role = {
  id: number,
  name: string
}

const roles = [
  {
    id: 1,
    name: 'role 1'
  },
  {
    id: 2,
    name: 'role 2'
  },
]

const RolesUnderCompany = () => {

  const { companyID } = useParams();

  const [rolesUnderCompany, setRolesUnderCompany] = useState<role[]>();

  useLayoutEffect(() => {
    const getData = async () => {
      const data = await getAllRolesUnderCompany(companyID);

      // setRolesUnderCompany(data);
      setRolesUnderCompany(roles);
    }
    getData();
  }, [companyID]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {rolesUnderCompany?.length === 0 || !rolesUnderCompany ?
          <>
            <div className='overflow-x-auto bg-white p-2'>
              Add Role? <Link href={`/deck-automation/${companyID}/addRole`} className='underline text-blue-500'>Click here</Link>
            </div>
          </>
          :
          <RenderRolesUnderCompany rolesUnderCompany={roles} />
        }
        <RenderRolesUnderCompany rolesUnderCompany={roles} />
      </div>
    </section>
  )
}

export default RolesUnderCompany