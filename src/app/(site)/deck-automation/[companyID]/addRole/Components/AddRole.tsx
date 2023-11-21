"use client";

import React, { ChangeEvent, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';

const AddRole = () => {
  const { companyID } = useParams();
  const router = useRouter();

  const [role, setRole] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!role) {
      return;
    }

    const response = await fetch(`/api/companies/${companyID}/roles`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role_name: role
      }),
      credentials: 'include',
    });

    if (response.ok) {
      router.replace(`/deck-automation/${companyID}`);

    } else {
      const data = await response.json();
      setError(true);
      setErrorDetails(data.error);
    }
  };
  return <>
    {error &&
      <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
        {errorDeatils}
        <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
      </div>
    }
    <div className="space-y-12 flex flex-col">
      <Input
        name='Role'
        id='role'
        placeholder={role}
        required={true}
        type='text'
        moveLabel={role != ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={!role || error}
        className={`${!role || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
      >
        Submit
      </button>
    </div>
  </>
}

export default AddRole