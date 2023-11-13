"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';

import { AQ, AQArray, AQBoolean, AQError } from '@/utils/constants';

import Input from './Components/Input';
import Modal from './Components/Modal';
import Select from './Components/Select';

const AddAdversityQuotientWeightage = ({ setCurrentStep }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>> }) => {

  // Fetch exsisting AQ
  const AdversityQuotient = AQArray;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [adversityQuotient, setAdversityQuotient] = useState<AQ[] | []>([]);

  const [adversityQuotientBoolean, setAdversityQuotientBoolean] = useState<AQBoolean[]>([]);

  const [adversityQuotientInputError, setAdversityQuotientInputError] = useState<AQError[]>([]);

  useLayoutEffect(() => {
    setAdversityQuotientInputError(AdversityQuotient.map(factor => ({ ...factor, error: false })));

    setAdversityQuotientBoolean(AdversityQuotient.map(factor => ({ ...factor, paramNeeded: false })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdversityQuotientNeededChange = (value: boolean, elementNo: number) => {

    setAdversityQuotientBoolean(prevAQ => {
      const index = prevAQ.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevAQ.slice(0, index),
          {
            ...prevAQ[index],
            paramNeeded: value
          },
          ...prevAQ.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevAQ;
    });

  };

  const onHandleAdversityQuotientNeededSubmit = () => {
    setAdversityQuotient(adversityQuotientBoolean.filter(factor => factor.paramNeeded === true));
    setIsModalOpen(false);
  };

  const handleAdversityQuotientInputChange = (value: number, elementNo: number) => {

    if (value > 100 || isNaN(value) || value <= 0) {
      setAdversityQuotientInputError(prevErrors => {
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
      setAdversityQuotientInputError(prevErrors => {
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

    setAdversityQuotient(prevAQ => {
      const index = prevAQ.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevAQ.slice(0, index),
          {
            ...prevAQ[index],
            value: value
          },
          ...prevAQ.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevAQ;
    });
  };

  const getValueByIdAdversityQuotient = (id: number) => {
    const factor = adversityQuotient.find(fact => fact.id === id);

    return factor?.value;
  };

  const checkErrorByIdAdversityQuotient = (id: number) => {
    const factor = adversityQuotientInputError.find(fact => fact.id === id);

    return factor ? factor?.error : false;
  };

  const getSelectValueAdversityQuotientBoolean = (id: number) => {
    return adversityQuotientBoolean.find(factor => factor.id === id)?.paramNeeded.toString() || 'false';
  };

  return <>
    {isModalOpen &&
      <>
        <Modal
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onHandleSubmit={onHandleAdversityQuotientNeededSubmit}
        >
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold capitalize relative'>
              <span className='border-b border-gray-500'>Adversity Quotients:</span>
            </h2>
            <div>
              {adversityQuotientBoolean?.map((detail) => (
                <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
                  <p className='text-[16px] leading-tight font-semibold self-center'>
                    {detail.name}:
                  </p>
                  <Select
                    id={`intelligence_factor_choose${detail.name}`}
                    value={getSelectValueAdversityQuotientBoolean(detail.id)}
                    options={[
                      {
                        value: getSelectValueAdversityQuotientBoolean(detail.id),
                        text: getSelectValueAdversityQuotientBoolean(detail.id)
                      },
                      {
                        value: getSelectValueAdversityQuotientBoolean(detail.id) === 'true' ? 'false' : 'true',
                        text: getSelectValueAdversityQuotientBoolean(detail.id) === 'true' ? 'false' : 'true'
                      }
                    ]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleAdversityQuotientNeededChange(e.target.value === 'true', detail.id)}
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
            <span className='border-b border-gray-500'>Adversity Quotients:</span>
          </h2>
          <div className='pt-1.5' onClick={() => setIsModalOpen(true)}>
            <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
          </div>

        </div>
        <div>
          {adversityQuotient?.map((detail) => (
            <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
              <p className='text-[16px] leading-tight font-semibold self-center'>
                {detail.name}:
              </p>
              <Input
                id={`intelligence_factor_${detail.name}`}
                placeholder={String(getValueByIdAdversityQuotient(detail.id))}
                required={true}
                moveLabel={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleAdversityQuotientInputChange(parseInt(e.currentTarget.value), detail.id)}
                error={checkErrorByIdAdversityQuotient(detail.id)}
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

export default AddAdversityQuotientWeightage