"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';

import { HandleEditCandidateInputChangeValue } from '@/utils/types';

const EditExpAchiv = (
  {
    handleInputChange,
    error,
    setErrorDetails,
    setError,
    count,
    expiAchivData
  }:
    {
      handleInputChange: HandleEditCandidateInputChangeValue,
      error: boolean,
      setErrorDetails: (details: string | null) => void,
      setError: (error: boolean) => void,
      count: number,
      expiAchivData: string[]
    }
) => {
  const [expAchivCount, setExpAchivCount] = useState(count);

  const [expiAchiv, setExpiAchiv] = useState<string[]>(expiAchivData);

  useEffect(() => {
    setExpAchivCount(count);
  }, [count]);

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

  const handleAddExpiAchiv = () => {
    setError(false);

    if (expAchivCount === 7) {
      setErrorDetails("Can't add more Experience & Achivements!");
      setError(true);

      return;
    }

    if (expiAchiv.some(point => point.length === 0)) {
      setErrorDetails("Can't add more Experience & Achivements! Fill the empty first");
      setError(true);

      return;
    }

    setExpAchivCount(prevCount => prevCount + 1);
    const updatedExpAchiv = [...expiAchiv, ''];

    handleInputChange(updatedExpAchiv, 'achievement');

    setExpiAchiv(updatedExpAchiv);
  };

  const handleExpiAchivChange = (index: number, value: string) => {
    const updatedExpAchiv = [...expiAchiv];

    updatedExpAchiv[index - 1] = value;

    setExpiAchiv(updatedExpAchiv);

    handleInputChange(updatedExpAchiv, 'achievement');
  };

  const handleRemoveExpAchiv = () => {
    setError(false);

    if (expAchivCount === 1) {
      setErrorDetails("Can't remove Experience & Achivements!");
      setError(true);

      return;
    };

    setExpAchivCount((prevCount) => Math.max(1, (prevCount !== undefined ? prevCount : 1) - 1));

    const updatedExpAchiv = expiAchiv.slice(0, -1);

    setExpiAchiv(updatedExpAchiv);

    handleInputChange(updatedExpAchiv, 'achievement');
  };

  const elements = [];

  if (expAchivCount != undefined) {
    for (let i = 1; i <= expAchivCount; i++) {
      elements.push(
        <div key={i}>
          <input
            type="text"
            name=""
            id=""
            maxLength={200}
            placeholder={expiAchiv && expiAchiv[i - 1]}
            value={expiAchiv ? expiAchiv[i - 1] : ''}
            className={`
            ${expiAchiv && expiAchiv[i - 1].length > 200 ? 'border-2 border-red-500 focus:border-red-500 focus:text-red-500 text-red-500 font-bold' : ''}
                    mt-2
                    h-full 
                    w-full 
                    rounded-[7px]
                    bg-transparent           
                    px-3 
                    py-2.5 
                    font-sans 
                    text-base 
                    border
                    border-black
                    `}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleExpiAchivChange(i, e.target.value)}
          />
        </div>
      )
    }
  };

  return <>
    <div className='mt-4 w-72 flex flex-col'>
      <label className={`font-semibold pl-2 flex flex-row justify-between`}>
        <span>
          Experience & Achivement
        </span>
        <span className='flex gap-2 pr-2 items-end'>
          <span className='font-bold cursor-pointer' onClick={() => handleAddExpiAchiv()}>+</span>
          <span className='font-bold cursor-pointer' onClick={() => handleRemoveExpAchiv()}>-</span>
        </span>
      </label>

      {elements}
      {/* {renderKeyPoints()} */}
    </div>
  </>

}

export default EditExpAchiv