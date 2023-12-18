'use client';

import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';

const EditQuotient = () => {
  const router = useRouter();

  const { quotientID } = useParams();

  const [quotient, setQuotient] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/quotients-all/${quotientID}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();

          setQuotient(data.data[0]?.quotient);

        } else {
          const data = await response.json();
          setError(true);
          setErrorDetails(data.error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (session?.user) {
      if (session.user.all_quotients_can_edit) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    };
  }, [quotientID, router, session?.user]);

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!quotient) {
      return;
    }

    try {
      const response = await fetch(`/api/quotients-all/${quotientID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quotient_name: quotient
        }),
        credentials: 'include',
      });

      if (response.ok) {
        router.replace(`/quotients`);
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
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/quotients`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Edit Quotient</h1>

          {error &&
            <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
              {errorDeatils}
              <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
            </div>
          }
          <div className="space-y-12 flex flex-col">
            <Input
              name='Quotient'
              id='quotient'
              placeholder={quotient}
              required={true}
              type='text'
              moveLabel={quotient != ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuotient(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={!quotient || error}
              className={`${!quotient || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
            >
              Update
            </button>
          </div>

        </div>
      </div>
    </section>
  </>
}

export default EditQuotient