"use client";

import React, { useLayoutEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import Image from 'next/image';

import Loading from '@/app/(site)/Components/Loading';
import AddParameterUnderQuotient from './Components/AddParameterUnderQuotients';

const QuotientAddPage = () => {
  const { roleID, companyID, quotient_w_ID } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients/${quotient_w_ID}/parameters`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length !== 0) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/${quotient_w_ID}`);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [companyID, roleID, router, quotient_w_ID]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <Loading /> :
            <>
              <section className='bg-[#FEFAEF] '>
                <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
                  <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}/${roleID}`)}>
                    {'<'}
                  </div>
                  <div className='flex py-12 flex-col items-center gap-12'>
                    <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />

                    <div>
                      <AddParameterUnderQuotient />
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