
import { HandleCandidateInputChangeValue, ParameterDetails } from '@/utils/types';
import React, { ChangeEvent, useState } from 'react';
import Input from './Input';

const ParameterQuotient = ({
  parameterWId,
  parameterName,
  parameterValue,
  handleInputChange,
  parameterDetails,
  candidateNo
}: {
  parameterWId: number,
  parameterName: string,
  parameterValue: number,
  handleInputChange: HandleCandidateInputChangeValue,
  parameterDetails: ParameterDetails[],
  candidateNo: number
}) => {

  const handleParameterValueChange = (value: number) => {
    const indexToUpdate = parameterDetails.findIndex(param => param.parameter_weightage_id === parameterWId);

    if (indexToUpdate !== -1) {
      const updatedParameterDetails = [...parameterDetails];

      updatedParameterDetails[indexToUpdate] = {
        ...updatedParameterDetails[indexToUpdate],
        value: value
      };

      handleInputChange(candidateNo, updatedParameterDetails, 'parameterDetails');
    }
  };

  return (
    <div className='flex flex-row justify-between pb-4 gap-4'>
      <p className='text-[16px] leading-tight font-semibold self-center'>
        {parameterName}:
      </p>
      <Input
        id={`intelligence_factor_${parameterName}`}
        placeholder={String(parameterValue)}
        required={true}
        moveLabel={false}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleParameterValueChange(parseInt(e.currentTarget.value))}
        error={parameterValue > 5 || parameterValue <= 0 || isNaN(parameterValue)}
      />
    </div>
  )
}

export default ParameterQuotient