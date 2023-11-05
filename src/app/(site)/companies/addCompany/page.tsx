"use client";

import Input from '@/app/(site)/deck-automation/Components/Input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const AddCompany = () => {
  const router = useRouter();

  const [companyName, setCompanyName] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    const response = await fetch('/api/companies', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: companyName
      }),
      credentials: 'include',
    }
    );

    if (response.status === 409) {
      const errorData = await response.json();

      setError(true);
      setErrorDetails(errorData.error);
    } else if (response.status == 400) {
      const errorData = await response.json();

      setError(true);
      setErrorDetails(errorData.details[0].message);
    } else if (response.status === 200) {
      router.replace('/companies');
    };
  };

  return (
    <div className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl'>
        <div className='font-semibold p-2 border-b-2 border-gray-200 cursor-pointer md:block hidden' onClick={() => router.back()} >
          {'<-'} goback
        </div>
        <div className='max-w-screen-sm mx-auto md:pt-6 pt-4'>
          <div className='flex justify-center py-4'>
            <Image width={120} height={120} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " />
          </div>

          <div className='flex flex-col'>
            {error &&
              <div className='bg-red-500 p-4 text-white font-semibold rounded-md w-1/2 my-3 flex justify-between'>
                {errorDeatils}
                <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
              </div>
            }

            <div className=" w-full mt-4 ">
              {/* <span className='text-red-600 font-bold '>*</span> Indicates a required field */}
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
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={`${!companyName && 'cursor-not-allowed opacity-50'} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default AddCompany