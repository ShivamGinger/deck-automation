"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { ParameterFactors } from '@/utils/types';
import Input from '../../../../Components/Input';
import Modal from '../../../../Components/Modal';
import Select from '../../../../Components/Select';

interface ParametersUnderQuotientsError extends ParameterFactors {
  error: boolean
};

interface ParametersUnderQuotientsBoolean extends ParameterFactors {
  paramNeeded: boolean
};

interface parametersUnderQuotientsend extends ParameterFactors {
  weightage: number
};

const AddParameterUnderQuotient = () => {
  const router = useRouter();

  const { companyID, roleID, quotient_w_ID } = useParams();

  const searchParams = useSearchParams();

  const quotientID = searchParams.get('qid');

  const [quotientName, setQuotientName] = useState('');

  const [allParametersUnderQuotients, setAllParametersUnderQuotients] = useState<ParameterFactors[]>([]);

  const [parametersUnderQuotients, setParametersUnderQuotients] = useState<parametersUnderQuotientsend[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [parametersUnderQuotientsBoolean, setParametersUnderQuotientsBoolean] = useState<ParametersUnderQuotientsBoolean[]>([]);

  const [parametersUnderQuotientsInputError, setParametersUnderQuotientsInputError] = useState<ParametersUnderQuotientsError[]>([]);

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  useLayoutEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/quotients-all/${quotientID}/qparam-all`, { method: 'GET' });

      if (response.ok) {
        const data = await response.json();

        setAllParametersUnderQuotients(data.data);
        setQuotientName(data.data[0].quotient_name);
      } else {
        const data = await response.json();

        setError(true);
        setErrorDetails(data.error);
      }
    };
    getData();
  }, [quotientID]);

  useEffect(() => {
    if (allParametersUnderQuotients) {
      setParametersUnderQuotientsInputError(allParametersUnderQuotients.map(factor => ({ ...factor, error: false })));
      setParametersUnderQuotientsBoolean(allParametersUnderQuotients.map(factor => ({ ...factor, paramNeeded: false })));
    }

  }, [allParametersUnderQuotients])


  const onHandleParametersUnderQuotientsNeededSubmit = () => {
    setParametersUnderQuotients(prevIF => ([
      ...parametersUnderQuotientsBoolean
        .filter(fact => fact.paramNeeded === true)
        .map(fact => ({
          ...fact,
          weightage: 1
        }))
    ]));
    setIsModalOpen(false);
  };

  const getSelectValueparametersUnderQuotientsBoolean = (id: number) => {
    return parametersUnderQuotientsBoolean?.find(factor => factor.parameter_id === id)?.paramNeeded.toString() || 'false';
  };

  const handleparametersUnderQuotientsParamNeededChange = (value: boolean, elementNo: number) => {
    setParametersUnderQuotientsBoolean(prevIF => {
      const index = prevIF?.findIndex(factor => factor.parameter_id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevIF.slice(0, index),
          {
            ...prevIF[index],
            paramNeeded: value
          },
          ...prevIF.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevIF;
    });
  };

  const getValueForParametersUnderQuotientsFactor = (id: number) => {
    const factor = parametersUnderQuotients.find(fact => fact.parameter_id === id);

    return factor?.weightage;
  };

  const checkErrorForParametersUnderQuotientsFactor = (id: number) => {
    const factor = parametersUnderQuotientsInputError.find(fact => fact.parameter_id === id);

    return factor ? factor.error : false
  };

  const handleQuotientWeightageFactorInputChange = (value: number, elementNo: number) => {

    if (value > 100 || isNaN(value) || value <= 0) {
      setParametersUnderQuotientsInputError(prevErrors => {
        const index = prevErrors.findIndex(err => err.parameter_id === elementNo);

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
      setParametersUnderQuotientsInputError(prevErrors => {
        const index = prevErrors.findIndex(err => err.parameter_id === elementNo);

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

    setParametersUnderQuotients(prevIF => {
      const index = prevIF.findIndex(factor => factor.parameter_id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevIF.slice(0, index),
          {
            ...prevIF[index],
            weightage: value
          },
          ...prevIF.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevIF;
    });
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    const total = Object.values(parametersUnderQuotients).reduce((acc, item) => acc + item.weightage, 0);

    if (total != 100) {
      setError(true);
      setErrorDetails("Total Percentages are not equal to 100.");
      return;
    }

    try {
      const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients/${quotientID}/parameters`, {
        method: 'POST',
        body: JSON.stringify({
          parameterW: parametersUnderQuotients.map(({ parameter_id, parameter_name, weightage }) => ({
            parameter_id,
            parameter_name,
            parameter_weightage: weightage
          }))
        })
      });

      if (response.ok) {

        router.push(`/deck-automation/${companyID}/${roleID}/quotients/${quotient_w_ID}`);

      } else {
        const data = await response.json();

        setError(true);
        setErrorDetails(data.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return <>
    {isModalOpen &&
      <>
        <Modal
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onHandleSubmit={onHandleParametersUnderQuotientsNeededSubmit}
        >
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold capitalize relative'>
              <span className='border-b border-gray-500'>{quotientName} Parameters:</span>
            </h2>
            {parametersUnderQuotientsBoolean && parametersUnderQuotientsBoolean.length > 0 ?
              <>
                <div>
                  {parametersUnderQuotientsBoolean?.map((detail) => (
                    <div key={detail.parameter_id} className='flex flex-row justify-between pb-4 gap-4'>
                      <p className='text-[16px] leading-tight font-semibold self-center'>
                        {detail.parameter_name}:
                      </p>
                      <Select
                        id={`intelligence_factor_choose${detail.parameter_name}`}
                        value={getSelectValueparametersUnderQuotientsBoolean(detail.parameter_id)}
                        options={[
                          {
                            value: getSelectValueparametersUnderQuotientsBoolean(detail.parameter_id),
                            text: getSelectValueparametersUnderQuotientsBoolean(detail.parameter_id)
                          },
                          {
                            value: getSelectValueparametersUnderQuotientsBoolean(detail.parameter_id) === 'true' ? 'false' : 'true',
                            text: getSelectValueparametersUnderQuotientsBoolean(detail.parameter_id) === 'true' ? 'false' : 'true'
                          }
                        ]}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleparametersUnderQuotientsParamNeededChange(e.target.value === 'true', detail.parameter_id)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </> :
              <>
                <Loading />
              </>
            }
          </div>
        </Modal>
      </>
    }
    {error &&
      <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between w-72 mb-4'>
        {errorDeatils}
        <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
      </div>
    }
    <div className="space-y-12 flex flex-col">
      <div className='flex flex-col justify-between gap-2'>
        <div className='flex gap-2'>
          <h2 className='text-xl font-bold capitalize relative '>
            <span className='border-b border-gray-500'>{quotientName} Parameters:</span>
          </h2>
          <div className='pt-1.5' onClick={() => setIsModalOpen(true)}>
            <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
          </div>

        </div>
        <div>
          {parametersUnderQuotients?.map((detail) => (
            <div key={detail.parameter_id} className='flex flex-row justify-between pb-4 gap-4'>
              <p className='text-[16px] leading-tight font-semibold self-center'>
                {detail.parameter_name}:
              </p>
              <Input
                id={`quotient_weightage_factor_${detail.parameter_name}`}
                placeholder={String(getValueForParametersUnderQuotientsFactor(detail.parameter_id))}
                required={true}
                moveLabel={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuotientWeightageFactorInputChange(parseInt(e.currentTarget.value), detail.parameter_id)}
                error={checkErrorForParametersUnderQuotientsFactor(detail.parameter_id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        <button
          onClick={handleSubmit}
          disabled={error || parametersUnderQuotients.length === 0}
          className={`${error || parametersUnderQuotients.length === 0 ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500] w-72`}
        >
          Submit
        </button>

      </div>
    </div >
  </>
}

export default AddParameterUnderQuotient