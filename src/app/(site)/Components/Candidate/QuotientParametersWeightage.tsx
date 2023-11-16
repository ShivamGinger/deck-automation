"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import { HandleCandidateInputChangeValue, QuotientFactors, QuotientFactorsError } from '@/utils/constants';

import Input from './Input';

const QuotientParametersWeightage = (
  {
    handleInputChange,
    candidateNo,
    AllParameters,
    factorName,
    factorID,
    name
  }:
    {
      handleInputChange: HandleCandidateInputChangeValue,
      candidateNo: number,
      AllParameters: QuotientFactors[],
      factorName: string,
      factorID: number,
      name: string
    }
) => {
  const [quotientParametersWeightage, setQuotientParametersWeightage] = useState<QuotientFactors[] | []>(AllParameters);

  const [intelligenceFactorsInputError, setQuotientParametersWeightageInputError] = useState<QuotientFactorsError[]>([]);

  useLayoutEffect(() => {
    setQuotientParametersWeightageInputError(quotientParametersWeightage.map(factor => ({ ...factor, error: false })));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIntelligenceFactorsInputChange = (value: number, elementNo: number) => {

    if (value > 5 || isNaN(value) || value <= 0) {
      setQuotientParametersWeightageInputError(prevErrors => {
        const index = prevErrors.findIndex(err => err.id === elementNo);

        if (index !== -1) {
          const updatedErrors = [
            ...prevErrors.slice(0, index),
            {
              ...prevErrors[index],
              error: true
            },
            ...prevErrors.slice(index + 1),
          ]

          return updatedErrors;
        }

        return prevErrors
      });
    } else {
      setQuotientParametersWeightageInputError(prevErrors => {
        const index = prevErrors.findIndex(err => err.id === elementNo);

        if (index !== -1) {
          const updatedErrors = [
            ...prevErrors.slice(0, index),
            {
              ...prevErrors[index],
              error: false
            },
            ...prevErrors.slice(index + 1),
          ]

          return updatedErrors;
        }

        return prevErrors
      });
    }

    setQuotientParametersWeightage(prevFactor => {
      const index = prevFactor.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevFactor.slice(0, index),
          {
            ...prevFactor[index],
            value: value
          },
          ...prevFactor.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevFactor;
    });

  };

  useEffect(() => {
    const updatedFactor = {
      id: factorID,
      parameters: quotientParametersWeightage
    };

    handleInputChange(candidateNo, updatedFactor, factorName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotientParametersWeightage]);

  const getValueByIdIntelligenceFactors = (id: number) => {
    const factor = quotientParametersWeightage.find(fact => fact.id === id);

    return factor?.value;
  };

  const checkErrorByIdIntelligenceFactors = (id: number) => {
    const factor = intelligenceFactorsInputError.find(fact => fact.id === id);

    return factor ? factor?.error : false;
  };

  return (
    <div className='flex flex-col my-4'>
      <h2 className='text-xl font-bold capitalize'>
        <span className='border-b border-gray-500'>{name} Values:</span>
      </h2>
      <div>
        {quotientParametersWeightage?.map((detail) => (
          <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
            <p className='text-[16px] leading-tight font-semibold self-center'>
              {detail.name}:
            </p>
            <Input
              id={`intelligence_factor_${detail.name}`}
              placeholder={String(getValueByIdIntelligenceFactors(detail.id))}
              required={true}
              moveLabel={false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleIntelligenceFactorsInputChange(parseInt(e.currentTarget.value), detail.id)}
              error={checkErrorByIdIntelligenceFactors(detail.id)}
            />
          </div>
        ))}
      </div>

    </div>
  )
}

export default QuotientParametersWeightage