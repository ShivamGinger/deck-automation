"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useLayoutEffect, useState } from 'react';

import RenderRolesUnderCompany from './Components/RenderRolesUnderCompany';

import { useParams } from 'next/navigation';

import axios from 'axios';
import Loading from '../../Components/Loading';

type role = {
  id: number,
  name: string
}

const RolesUnderCompany = () => {

  const { companyID } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [rolesUnderCompany, setRolesUnderCompany] = useState<role[]>();

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles`, { method: 'GET' });

        if (response.ok) {
          const data = await response.json();

          setRolesUnderCompany(data.data);
        } else {
          const data = await response.json();

          if (data.error === 'Company not found') {
            router.replace('/deck-automation');
          } else {
            setResponseDetails(data.error);
          }
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
              {responseDetails ?
                <>
                  {responseDetails}
                  <div className='overflow-x-auto bg-white p-2'>
                    Add Role? <Link href={`/deck-automation/${companyID}/addRole`} className='underline text-blue-500'>Click here</Link>
                  </div>
                </>
                :
                <RenderRolesUnderCompany rolesUnderCompany={rolesUnderCompany} />
              }
            </>
        }
      </div>
    </section>
  )
}

export default RolesUnderCompany