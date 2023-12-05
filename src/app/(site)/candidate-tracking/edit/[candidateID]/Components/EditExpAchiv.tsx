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
    placeholderData,
    expiAchivData
  }:
    {
      handleInputChange: HandleEditCandidateInputChangeValue,
      error: boolean,
      setErrorDetails: (details: string | null) => void,
      setError: (error: boolean) => void,
      count: number,
      placeholderData: string[] | undefined,
      expiAchivData: string[]
    }
) => {
  const [expAchivCount, setExpAchivCount] = useState(count);

  const [placeholder, setPlaceholderData] = useState(placeholderData);

  const [expiAchiv, setExpiAchiv] = useState<string[]>(expiAchivData);

  useEffect(() => {
    setExpAchivCount(count);
  }, [count]);

  useEffect(() => {
    setPlaceholderData(placeholderData);
  }, [placeholderData]);

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
      setErrorDetails("Can't add more Key Points!");
      setError(true);

      return;
    }

    setExpAchivCount(prevCount => prevCount + 1);
    const updatedExpAchiv = [...expiAchiv, ''];

    handleInputChange(updatedExpAchiv, 'key_points');

    setExpiAchiv(updatedExpAchiv);
  };

  const handleExpiAchivChange = (index: number, value: string) => {
    const updatedExpAchiv = [...expiAchiv];

    updatedExpAchiv[index - 1] = value;

    setExpiAchiv(updatedExpAchiv);

    handleInputChange(updatedExpAchiv, 'key_points');
  };

  const handleRemoveExpAchiv = () => {
    setError(false);

    if (expAchivCount === 1) {
      setErrorDetails("Can't remove Key Points!");
      setError(true);

      return;
    };

    setExpAchivCount((prevCount) => Math.max(1, (prevCount !== undefined ? prevCount : 1) - 1));

    const updatedExpAchiv = expiAchiv.slice(0, -1);

    setExpiAchiv(updatedExpAchiv);

    handleInputChange(updatedExpAchiv, 'key_points');
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
            placeholder={placeholder && placeholder[i - 1]}
            className={`
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