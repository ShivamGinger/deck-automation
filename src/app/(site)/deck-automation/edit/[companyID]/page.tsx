'use client';

import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';
import Loading from '@/app/(site)/Components/Loading';
import { useSession } from 'next-auth/react';

const EditCompany = () => {
  const router = useRouter();

  const { companyID } = useParams();

  const [companyName, setCompanyName] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();

          setCompanyName(data.data[0]?.name);
        } else {
          const data = await response.json();
          setError(true);
          setErrorDetails(data.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      if (session?.user.deck_automation_can_edit) {
        getData();
      } else {
        router.replace('/');
        return;
      }
    }
  }, [companyID, router, session?.user]);

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!companyName) {
      return;
    }

    try {
      const response = await fetch(`/api/companies/${companyID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName
        }),
        credentials: 'include',
      });

      if (response.ok) {
        router.replace(`/deck-automation`);
        router.refresh();
      } else {
        const data = await response.json();
        setError(true);
        setErrorDetails(data.error);
      }
    } catch (err) {
      console.log(err);
    }

  };
  return <>
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="ginger-partners-logo" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Edit Company Name</h1>

          {error &&
            <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
              {errorDeatils}
              <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
            </div>
          }
          <div className="space-y-12 flex flex-col">
            {
              loading ?
                <Loading /> :
                <>
                  <Input
                    name='Company Name'
                    id='company_name'
                    placeholder={companyName}
                    required={true}
                    type='text'
                    moveLabel={companyName != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={!companyName || error}
                    className={`${!companyName || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
                  >
                    Update
                  </button>
                </>
            }
          </div>
        </div>
      </div>
    </section>
  </>
}

export default EditCompany