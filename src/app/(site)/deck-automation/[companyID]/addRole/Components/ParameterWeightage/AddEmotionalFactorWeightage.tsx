"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';

import { EF, EFArray, EFBoolean, EFError } from '@/utils/constants';

import Input from './Components/Input';
import Modal from './Components/Modal';
import Select from './Components/Select';

const AddEmotionalFactorWeightage = () => {

  // Fetch exsisting EF
  const EmotionalFactors = EFArray;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [emotionalFactors, setEmotionalFactors] = useState<EF[] | []>([]);

  const [emotionalFactorsBoolean, setEmotionalFactorsBoolean] = useState<EFBoolean[]>([]);

  const [emotionalFactorsInputError, setEmotionalFactorsInputError] = useState<EFError[]>([]);

  useLayoutEffect(() => {
    setEmotionalFactorsInputError(EmotionalFactors.map(factor => ({ ...factor, error: false })));

    setEmotionalFactorsBoolean(EmotionalFactors.map(factor => ({ ...factor, paramNeeded: false })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmotionalFactorsNeededChange = (value: boolean, elementNo: number) => {

    setEmotionalFactorsBoolean(prevEF => {
      const index = prevEF.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevEF.slice(0, index),
          {
            ...prevEF[index],
            paramNeeded: value
          },
          ...prevEF.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevEF;
    });

  };

  const onHandleEmotionalFactorsNeededSubmit = () => {
    setEmotionalFactors(emotionalFactorsBoolean.filter(factor => factor.paramNeeded === true));
    setIsModalOpen(false);
  };

  const handleEmotionalFactorsInputChange = (value: number, elementNo: number) => {

    if (value > 100 || isNaN(value) || value <= 0) {
      setEmotionalFactorsInputError(prevErrors => {
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
      setEmotionalFactorsInputError(prevErrors => {
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

    setEmotionalFactors(prevEF => {
      const index = prevEF.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevEF.slice(0, index),
          {
            ...prevEF[index],
            value: value
          },
          ...prevEF.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevEF;
    });
  };

  const getValueByIdEmotionalFactors = (id: number) => {
    const factor = emotionalFactors.find(fact => fact.id === id);

    return factor?.value;
  };

  const checkErrorByIdEmotionalFactors = (id: number) => {
    const factor = emotionalFactorsInputError.find(fact => fact.id === id);

    return factor ? factor?.error : false;
  };

  const getSelectValueEmotionalFactorsBoolean = (id: number) => {
    return emotionalFactorsBoolean.find(factor => factor.id === id)?.paramNeeded.toString() || 'false';
  };

  return <>
    {isModalOpen &&
      <>
        <Modal
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onHandleSubmit={onHandleEmotionalFactorsNeededSubmit}
        >
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold capitalize relative'>
              <span className='border-b border-gray-500'>Emotional Factors:</span>
            </h2>
            <div>
              {emotionalFactorsBoolean?.map((detail) => (
                <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
                  <p className='text-[16px] leading-tight font-semibold self-center'>
                    {detail.name}:
                  </p>
                  <Select
                    id={`intelligence_factor_choose${detail.name}`}
                    value={getSelectValueEmotionalFactorsBoolean(detail.id)}
                    options={[
                      {
                        value: getSelectValueEmotionalFactorsBoolean(detail.id),
                        text: getSelectValueEmotionalFactorsBoolean(detail.id)
                      },
                      {
                        value: getSelectValueEmotionalFactorsBoolean(detail.id) === 'true' ? 'false' : 'true',
                        text: getSelectValueEmotionalFactorsBoolean(detail.id) === 'true' ? 'false' : 'true'
                      }
                    ]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleEmotionalFactorsNeededChange(e.target.value === 'true', detail.id)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </>
    }
    <div className="space-y-12 flex flex-col">
      <div className='flex flex-col justify-between gap-2'>
        <div className='flex gap-2'>
          <h2 className='text-xl font-bold capitalize relative '>
            <span className='border-b border-gray-500'>Emotional Factors:</span>
          </h2>
          <div className='pt-1.5' onClick={() => setIsModalOpen(true)}>
            <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
          </div>

        </div>
        <div>
          {emotionalFactors?.map((detail) => (
            <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
              <p className='text-[16px] leading-tight font-semibold self-center'>
                {detail.name}:
              </p>
              <Input
                id={`intelligence_factor_${detail.name}`}
                placeholder={String(getValueByIdEmotionalFactors(detail.id))}
                required={true}
                moveLabel={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmotionalFactorsInputChange(parseInt(e.currentTarget.value), detail.id)}
                error={checkErrorByIdEmotionalFactors(detail.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <>

      </>
      <div className='flex justify-center'>
        <button
          // onClick={handleSubmit}
          className={`${'cursor-not-allowed opacity-50'} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500] w-72`}
        >
          Submit
        </button>

      </div>
    </div >
  </>
}

export default AddEmotionalFactorWeightage