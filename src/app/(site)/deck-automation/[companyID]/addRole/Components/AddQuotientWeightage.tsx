"use client";
import Input from '@/app/(site)/Components/Input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

const AddQuotientWeightage = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) => {
  const { companyID } = useParams();

  const [quotientWeightage, setQuotientWeightage] = useState({
    "Intelligence Factor": 10,
    "Emotional Factor": 10,
    "Social Factor": 10,
    "Adversity Quotient": 10,
  });

  const [inputError, setInputError] = useState({
    "Intelligence Factor": false,
    "Emotional Factor": false,
    "Social Factor": false,
    "Adversity Quotient": false,
  });

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const handleInputChange = (value: number, field: string) => {
    setErrorDetails(null);
    setError(false);

    setInputError(prevInputError => ({
      ...prevInputError,
      [field]: false
    }));

    if (value > 100 || isNaN(value)) {
      setInputError(prevInputError => ({
        ...prevInputError,
        [field]: true
      }));
    };

    setQuotientWeightage(prevWeightage => ({
      ...prevWeightage,
      [field]: value
    }))
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    const total = Object.values(quotientWeightage).reduce((acc, value) => acc + value, 0);

    if (total != 100) {
      setError(true);
      setErrorDetails("Total Percentages are not equal to 100.");
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
      <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between w-72 mb-4'>
        {errorDeatils}
        <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
      </div>
    }
    <div className="space-y-12 flex flex-col">
      <Input
        name='Intelligence Factor'
        id='intelligence_factor'
        placeholder={String(quotientWeightage['Intelligence Factor'])}
        required={true}
        type='number'
        moveLabel={quotientWeightage['Intelligence Factor'] >= 0 || isNaN(quotientWeightage['Intelligence Factor'])}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(parseInt(e.currentTarget.value), "Intelligence Factor")}
        error={inputError['Intelligence Factor']}
      />

      <Input
        name='Emotional Factor'
        id='emotional_factor'
        placeholder={String(quotientWeightage['Emotional Factor'])}
        required={true}
        type='number'
        moveLabel={quotientWeightage['Emotional Factor'] >= 0 || isNaN(quotientWeightage['Emotional Factor'])}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(parseInt(e.currentTarget.value), "Emotional Factor")}
        error={inputError['Emotional Factor']}
      />

      <Input
        name='Social Factor'
        id='social_factor'
        placeholder={String(quotientWeightage['Social Factor'])}
        required={true}
        type='number'
        moveLabel={quotientWeightage['Social Factor'] >= 0 || isNaN(quotientWeightage['Social Factor'])}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(parseInt(e.currentTarget.value), "Social Factor")}
        error={inputError['Social Factor']}
      />

      <Input
        name='Adversity Quotient'
        id='adversity_quotient'
        placeholder={String(quotientWeightage['Adversity Quotient'])}
        required={true}
        type='number'
        moveLabel={quotientWeightage['Adversity Quotient'] >= 0 || isNaN(quotientWeightage['Adversity Quotient'])}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(parseInt(e.currentTarget.value), "Adversity Quotient")}
        error={inputError['Adversity Quotient']}
      />


      <button
        onClick={handleSubmit}
        className={`${error && 'cursor-not-allowed opacity-50'} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
      >
        Submit
      </button>
    </div>
  </>
}

export default AddQuotientWeightage