"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';

import { HandleCandidateInputChangeValue } from '@/utils/types';

const ExpAchiv = (
  {
    handleInputChange,
    candidateNo,
    error,
    setErrorDetails,
    setError,
    count,
    placeholderData
  }:
    {
      handleInputChange: HandleCandidateInputChangeValue,
      candidateNo: number,
      error: boolean,
      setErrorDetails: (details: string | null) => void,
      setError: (error: boolean) => void,
      count: number,
      placeholderData: string[]
    }
) => {
  const [expAchivCount, setExpAchivCount] = useState(1);

  const [placeholder, setPlaceholderData] = useState(placeholderData);

  const [expAchiv, setExpAchiv] = useState<string[]>(['']);

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
      setErrorDetails("Can't add more Experience & Achivements!");
      setError(true);
      return;
    }

    setExpAchivCount(prevCount => prevCount + 1);
    const updatedKeyPoints = [...expAchiv, ''];

    setExpAchiv(updatedKeyPoints);
  };

  const handleExpiAchivChange = (index: number, value: string) => {

    const updatedExpiAchiv = [...expAchiv];

    if (updatedExpiAchiv) {
      updatedExpiAchiv[index - 1] = value;

      setExpAchiv(updatedExpiAchiv);

      handleInputChange(candidateNo, updatedExpiAchiv, 'achievement');
    }
  };

  const handleRemoveExpAchiv = () => {
    setError(false);

    if (expAchivCount === 1) {
      setErrorDetails("Can't remove Experience & Achivements!");
      setError(true);

      return;
    };

    setExpAchivCount(prevCount => Math.max(1, prevCount - 1));

    const updatedKeyPoints = expAchiv.slice(0, -1);

    setExpAchiv(updatedKeyPoints);

    handleInputChange(candidateNo, updatedKeyPoints, 'achievement');
  };

  const elements = [];

  for (let i = 1; i <= expAchivCount; i++) {
    elements.push(
      <div key={i}>
        <input
          type="text"
          name=""
          id=""
          placeholder={placeholder[i - 1]}
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
    </div>
  </>
}

export default ExpAchiv