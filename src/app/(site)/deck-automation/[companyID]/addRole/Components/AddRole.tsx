"use client";
import Input from '@/app/(site)/Components/Input'
import { useParams } from 'next/navigation';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

const AddRole = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) => {
  const { companyID } = useParams();

  const [role, setRole] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!role) {
      return;
    }
    // const response = await fetch('/api/', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({

    //   }),
    //   credentials: 'include',
    // }
    // );

    // if (response.status === 409) {
    //   const errorData = await response.json();

    //   setError(true);
    //   setErrorDetails(errorData.error);
    // } else if (response.status == 400) {
    //   const errorData = await response.json();

    //   setError(true);
    //   setErrorDetails(errorData.details[0].message);
    // } else if (response.status === 200) {

    //   setCurrentStep(prevCount => prevCount + 1);
    // };
    setCurrentStep(prevCount => prevCount + 1);

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
        className={`${!role && 'cursor-not-allowed opacity-50'} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
      >
        Submit
      </button>
    </div>
  </>
}

export default AddRole