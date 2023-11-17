'use client';

import Input from '@/app/(site)/Components/Input';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const AddQuotient = () => {
  const router = useRouter();

  const [quotient, setQuotient] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!quotient) {
      return;
    }

    const response = await fetch(`/api/quotients-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quotient,
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
  };
  return <>
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/quotients`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Add Quotient</h1>

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
              Submit
            </button>
          </div>

        </div>
      </div>
    </section>
  </>
}

export default AddQuotient