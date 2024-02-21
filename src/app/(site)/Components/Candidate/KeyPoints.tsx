"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';

import { HandleCandidateInputChangeValue } from '@/utils/types';

const KeyPoints = (
  {
    handleInputChange,
    candidateNo,
    error,
    setErrorDetails,
    setError,
    count,
  }:
    {
      handleInputChange: HandleCandidateInputChangeValue,
      candidateNo: number,
      error: boolean,
      setErrorDetails: (details: string | null) => void,
      setError: (error: boolean) => void,
      count: number,
    }
) => {
  const [keyPointsCount, setKeyPointsCount] = useState(count);

  const [keyPoints, setKeyPoints] = useState<string[]>(['']);

  useEffect(() => {
    setKeyPointsCount(count);
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

  const handleAddKeyPoints = () => {
    setError(false);

    if (keyPointsCount === 7) {
      setErrorDetails("Can't add more Key Points!");
      setError(true);

      return;
    }

    if (keyPoints.some(point => point.length === 0)) {
      setErrorDetails("Can't add more Key Points! Fill the empty first");
      setError(true);

      return;
    }

    setKeyPointsCount(prevCount => prevCount + 1);
    const updatedKeyPoints = [...keyPoints, ''];

    handleInputChange(candidateNo, updatedKeyPoints, 'key_points');

    setKeyPoints(updatedKeyPoints);
  };

  const handleKeyPointsChange = (index: number, value: string) => {

    const updatedKeyPoints = [...keyPoints];

    if (updatedKeyPoints) {
      updatedKeyPoints[index - 1] = value;

      setKeyPoints(updatedKeyPoints);

      handleInputChange(candidateNo, updatedKeyPoints, 'key_points');
    }

  };

  const handleRemoveKeyPoints = () => {
    setError(false);

    if (keyPointsCount === 1) {
      setErrorDetails("Can't remove Key Points!");
      setError(true);

      return;
    };

    setKeyPointsCount(prevCount => Math.max(1, prevCount - 1));

    const updatedKeyPoints = keyPoints.slice(0, -1);

    setKeyPoints(updatedKeyPoints);

    handleInputChange(candidateNo, updatedKeyPoints, 'key_points');
  };

  const elements = [];

  for (let i = 1; i <= keyPointsCount; i++) {
    elements.push(
      <div key={i}>
        <input
          type="text"
          name=""
          id=""
          maxLength={110}
          placeholder={keyPoints && keyPoints[i - 1]}
          value={keyPoints ? keyPoints[i - 1] : ''}
          className={`
            ${keyPoints && keyPoints[i - 1].length > 110 ? 'border-2 border-red-500 focus:border-red-500 focus:text-red-500 text-red-500 font-bold' : ''}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleKeyPointsChange(i, e.target.value)}
        />
      </div>
    )
  }

  return <>
    <div className='mt-4 w-72 flex flex-col'>
      <label className={`font-semibold pl-2 flex flex-row justify-between`}>
        <span>
          Key Points
        </span>
        <span className='flex gap-2 pr-2 items-end'>
          <span className='font-bold cursor-pointer' onClick={() => handleAddKeyPoints()}>+</span>
          <span className='font-bold cursor-pointer' onClick={() => handleRemoveKeyPoints()}>-</span>
        </span>
      </label>

      {elements}
      {/* {renderKeyPoints()} */}
    </div>
  </>

}

export default KeyPoints