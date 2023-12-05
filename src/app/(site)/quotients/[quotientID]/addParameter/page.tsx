'use client';

import React, { ChangeEvent, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';

const AddParameter = () => {
  const { quotientID } = useParams();
  const router = useRouter();

  const [parameter, setParameter] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!parameter) {
      return;
    }

    const response = await fetch(`/api/quotients-all/${quotientID}/qparam-all`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parameter_name: parameter
      }),
      credentials: 'include',
    }
    );

    if (response.ok) {
      router.replace(`/quotients/${quotientID}`);
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
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/quotients/${quotientID}`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Add Parameter</h1>

          {error &&
            <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
              {errorDeatils}
              <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
            </div>
          }
          <div className="space-y-12 flex flex-col">
            <Input
              name='Parameter'
              id='parameter'
              placeholder={parameter}
              required={true}
              type='text'
              moveLabel={parameter != ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setParameter(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={!parameter || error}
              className={`${!parameter || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
            >
              Submit
            </button>
          </div>

        </div>
      </div>
    </section>
  </>
}

export default AddParameter