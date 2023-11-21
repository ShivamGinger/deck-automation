"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useLayoutEffect, useState } from 'react';

import RenderRolesUnderCompany from './Components/RenderRolesUnderCompany';

import { useParams } from 'next/navigation';

import { RoleDetails } from '@/utils/types';
import Loading from '../../Components/Loading';

const RolesUnderCompany = () => {

  const { companyID } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [rolesUnderCompany, setRolesUnderCompany] = useState<RoleDetails[]>([]);
  const [companyName, setCompanyName] = useState('');

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setCompanyName(data.data[0].company_name);
          setRolesUnderCompany(data.data);
        } else {
          const data = await response.json();

          setResponseDetails(data.error);
        }

      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [companyID, router]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <Loading /> :
            <>
              {responseDetails || rolesUnderCompany?.length === 0 ?
                <>
                  {responseDetails}
                  <div className='overflow-x-auto bg-white p-2'>
                    Add Role? <Link href={`/deck-automation/${companyID}/addRole`} className='underline text-blue-500'>Click here</Link>
                  </div>
                </>
                :
                <RenderRolesUnderCompany
                  rolesUnderCompany={rolesUnderCompany}
                  companyName={companyName}
                />
              }
            </>
        }
      </div>
    </section>
  )
}

export default RolesUnderCompany