"use client";

import React, { useLayoutEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Image from 'next/image';

import Loading from '@/app/(site)/Components/Loading';
import { useSession } from 'next-auth/react';
import AddQuotientWeightage from './Components/AddQuotientWeightage';

const QuotientAddPage = () => {
  const { roleID, companyID } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useLayoutEffect(() => {
    if (!session?.user.can_create) {
      router.replace('/');
      return;
    }

    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length !== 0) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients`);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [companyID, roleID, router, session?.user.can_create]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <Loading /> :
            <>
              <section className='bg-[#FEFAEF] '>
                <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
                  <div className='flex py-12 flex-col items-center gap-12'>
                    <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />

                    <div>
                      <AddQuotientWeightage />
                    </div>
                  </div>
                </div>
              </section>
            </>
        }
      </div>
    </section>
  )
}

export default QuotientAddPage