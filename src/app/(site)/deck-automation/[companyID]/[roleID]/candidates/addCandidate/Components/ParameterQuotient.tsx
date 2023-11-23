
import { HandleCandidateInputChangeValue, ParameterDetails, ParametersQuotientFactorsValue } from '@/utils/types';
import React, { ChangeEvent } from 'react';
import Input from './Input';

const ParameterQuotient = ({
  parameterId,
  parameterName,
  parameterValue,
  handleInputChange,
  parameterDetails,
  candidateNo
}: {
  parameterId: number,
  parameterName: string,
  parameterValue: number,
  handleInputChange: HandleCandidateInputChangeValue,
  parameterDetails: ParametersQuotientFactorsValue[],
  candidateNo: number
}) => {

  const handleParameterValueChange = (value: number) => {
    const indexToUpdate = parameterDetails.findIndex(param => param.parameter_id === parameterId);

    if (indexToUpdate !== -1) {
      const updatedParameterDetails = [...parameterDetails];

      updatedParameterDetails[indexToUpdate] = {
        ...updatedParameterDetails[indexToUpdate],
        parameter_score: value
      };

      handleInputChange(candidateNo, updatedParameterDetails, 'candidate_parameter_scores');
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