"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';
import { useSession } from 'next-auth/react';

const AddCompany = () => {
  const router = useRouter();

  const [companyName, setCompanyName] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  useLayoutEffect(() => {
    if (session?.user) {
      if (!session?.user.deck_automation_can_create) {
        router.replace('/');
        return;
      }
    }
  }, [router, session?.user]);

  useEffect(() => {
    if (error) {
      const container = document.getElementById('side-body');

      if (container) {
        container.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [error]);


  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!companyName) {
      setErrorDetails('Missing / Invalid Data!');
      setError(true);
      return;
    }

    const response = await fetch('/api/companies', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_name: companyName
      }),
      credentials: 'include',
    });

    if (response.ok) {
      router.replace('/deck-automation');
    } else {
      const errorData = await response.json();

      setError(true);
      setErrorDetails(errorData.error);
    }
  };

  return (
    <>
      <section className='bg-[#FEFAEF] '>
        <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
          <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace('/deck-automation')}>
            {'<'}
          </div>
          <div className='flex justify-center py-12 flex-col items-center gap-12'>
            <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="ginger-partners-logo" className="rounded-xl " priority />
            <h1 className='text-xl font-bold uppercase'>Add Company</h1>
            {error &&
              <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between w-1/4'>
                {errorDeatils}
                <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
              </div>
            }
            <div className="space-y-12">
              <Input
                name='Company Name'
                id='company_name'
                placeholder={companyName}
                required={true}
                type='text'
                moveLabel={companyName != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!companyName || error}
              className={`${!companyName || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddCompany