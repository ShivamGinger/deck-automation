"use client";

import React, { useLayoutEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';

const DisplayQuotientsUnderRoles = () => {
  const { roleID, companyID } = useParams();

  const router = useRouter();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.data.length === 0) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/addQuotients`);

          } else {
            router.replace(`/deck-automation/${companyID}/${roleID}/candidates`);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [companyID, roleID, router]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        <Loading />
      </div>
    </section>
  )
}

export default DisplayQuotientsUnderRoles