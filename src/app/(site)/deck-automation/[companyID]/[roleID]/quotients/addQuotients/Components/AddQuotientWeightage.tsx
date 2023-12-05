"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { QuotientFactors } from '@/utils/types';
import Input from '../../../Components/Input';
import Modal from '../../../Components/Modal';
import Select from '../../../Components/Select';

interface QuotientsWeightageError extends QuotientFactors {
  error: boolean
};

interface QuotientsWeightageBoolean extends QuotientFactors {
  paramNeeded: boolean
};

interface QuotientsWeightageSend extends QuotientFactors {
  weightage: number
};

const AddQuotientWeightage = () => {
  const router = useRouter();

  const { companyID, roleID } = useParams();

  const [allQuotientWeightageFactors, setAllQuotientWeightageFactors] = useState<QuotientFactors[]>([]);

  const [quotientWeightageFactors, setQuotientWeightageFactors] = useState<QuotientsWeightageSend[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quotientsWeightagesBoolean, setQuotientsWeightagesBoolean] = useState<QuotientsWeightageBoolean[]>([]);

  const [quotientsWeightagesInputError, setQuotientsWeightagesInputError] = useState<QuotientsWeightageError[]>([]);

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  useLayoutEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/quotients-all', { method: 'GET' });

      if (response.ok) {
        const data = await response.json();

        setAllQuotientWeightageFactors(data.data);

      } else {
        const data = await response.json();
        setError(true);
        setErrorDetails(data.data);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (allQuotientWeightageFactors) {
      setQuotientsWeightagesInputError(allQuotientWeightageFactors.map(factor => ({ ...factor, error: false })));
      setQuotientsWeightagesBoolean(allQuotientWeightageFactors.map(factor => ({ ...factor, paramNeeded: false })));
    }

  }, [allQuotientWeightageFactors])


  const onHandleQuotientsWeightageNeededSubmit = () => {
    setQuotientWeightageFactors(prevIF => ([
      ...quotientsWeightagesBoolean
        .filter(fact => fact.paramNeeded === true)
        .map(fact => ({
          ...fact,
          weightage: 1
        }))
    ]));
    setIsModalOpen(false);
  };

  const getSelectValueQuotientWeightageFactorsBoolean = (id: number) => {
    return quotientsWeightagesBoolean?.find(factor => factor.quotient_id === id)?.paramNeeded.toString() || 'false';
  };

  const handleQuotientWeightageFactorsParamNeededChange = (value: boolean, elementNo: number) => {
    setQuotientsWeightagesBoolean(prevIF => {
      const index = prevIF?.findIndex(factor => factor.quotient_id === elementNo);
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

  const getValueForQuotientsWeightageFactor = (id: number) => {
    const factor = quotientWeightageFactors.find(fact => fact.quotient_id === id);

    return factor?.weightage;
  };

  const checkErrorForQuotientsWeightageFactor = (id: number) => {
    const factor = quotientsWeightagesInputError.find(fact => fact.quotient_id === id);

    return factor ? factor.error : false
  };

  const handleQuotientWeightageFactorInputChange = (value: number, elementNo: number) => {

    if (value > 100 || isNaN(value) || value <= 0) {
      setQuotientsWeightagesInputError(prevErrors => {
        const index = prevErrors.findIndex(err => err.quotient_id === elementNo);

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
      setQuotientsWeightagesInputError(prevErrors => {
        const index = prevErrors.findIndex(err => err.quotient_id === elementNo);

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

    setQuotientWeightageFactors(prevIF => {
      const index = prevIF.findIndex(factor => factor.quotient_id === elementNo);
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

    const total = Object.values(quotientWeightageFactors).reduce((acc, item) => acc + item.weightage, 0);

    if (total != 100) {
      setError(true);
      setErrorDetails("Total Percentages are not equal to 100.");
      return;
    }

    try {
      const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
        method: 'POST',
        body: JSON.stringify({
          quotientW: quotientWeightageFactors.map(({ quotient_id, quotient_name, weightage }) => ({
            quotient_id,
            quotient_name,
            quotient_weightage: weightage
          }))
        })
      });


      if (response.ok) {
        router.push(`/deck-automation/${companyID}/${roleID}/quotients`);

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
          onHandleSubmit={onHandleQuotientsWeightageNeededSubmit}
        >
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold capitalize relative'>
              <span className='border-b border-gray-500'>Quotients Weightage Factors:</span>
            </h2>
            {quotientsWeightagesBoolean && quotientsWeightagesBoolean.length > 0 ?
              <>
                <div>
                  {quotientsWeightagesBoolean?.map((detail) => (
                    <div key={detail.quotient_id} className='flex flex-row justify-between pb-4 gap-4'>
                      <p className='text-[16px] leading-tight font-semibold self-center'>
                        {detail.quotient_name}:
                      </p>
                      <Select
                        id={`intelligence_factor_choose${detail.quotient_name}`}
                        value={getSelectValueQuotientWeightageFactorsBoolean(detail.quotient_id)}
                        options={[
                          {
                            value: getSelectValueQuotientWeightageFactorsBoolean(detail.quotient_id),
                            text: getSelectValueQuotientWeightageFactorsBoolean(detail.quotient_id)
                          },
                          {
                            value: getSelectValueQuotientWeightageFactorsBoolean(detail.quotient_id) === 'true' ? 'false' : 'true',
                            text: getSelectValueQuotientWeightageFactorsBoolean(detail.quotient_id) === 'true' ? 'false' : 'true'
                          }
                        ]}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleQuotientWeightageFactorsParamNeededChange(e.target.value === 'true', detail.quotient_id)}
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
            <span className='border-b border-gray-500'>Quotients Weightage Factors:</span>
          </h2>
          <div className='pt-1.5' onClick={() => setIsModalOpen(true)}>
            <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
          </div>

        </div>
        <div>
          {quotientWeightageFactors?.map((detail) => (
            <div key={detail.quotient_id} className='flex flex-row justify-between pb-4 gap-4'>
              <p className='text-[16px] leading-tight font-semibold self-center'>
                {detail.quotient_name}:
              </p>
              <Input
                id={`quotient_weightage_factor_${detail.quotient_name}`}
                placeholder={String(getValueForQuotientsWeightageFactor(detail.quotient_id))}
                required={true}
                moveLabel={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuotientWeightageFactorInputChange(parseInt(e.currentTarget.value), detail.quotient_id)}
                error={checkErrorForQuotientsWeightageFactor(detail.quotient_id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        <button
          onClick={handleSubmit}
          disabled={error || quotientWeightageFactors.length === 0}
          className={`${error || quotientWeightageFactors.length === 0 ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500] w-72`}
        >
          Submit
        </button>

      </div>
    </div >
  </>
}

export default AddQuotientWeightage