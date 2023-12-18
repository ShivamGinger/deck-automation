"use client";

import React, { useLayoutEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { useSession } from 'next-auth/react';

const DisplayQuotientsUnderRoles = () => {
  const { roleID, companyID } = useParams();

  const router = useRouter();

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length === 0 && session?.user.deck_automation_can_create) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/addQuotients`);

          } else {
            router.replace(`/deck-automation/${companyID}/${roleID}/candidates`);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (session?.user) {
      if (session.user.deck_automation_can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    };
  }, [companyID, roleID, router, session?.user]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        <Loading />
      </div>
    </section>
  )
}

export default DisplayQuotientsUnderRoles