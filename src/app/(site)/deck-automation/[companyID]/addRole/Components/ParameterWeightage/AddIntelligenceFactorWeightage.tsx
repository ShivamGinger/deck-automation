"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';

import Input from './Components/Input';
import Modal from './Components/Modal';
import Select from './Components/Select';

const IF = [
  {
    id: 1,
    name: "Problem Solving Ability",
    value: 0
  },
  {
    id: 2,
    name: "Innovation ability",
    value: 0
  },
  {
    id: 3,
    name: "Working Memory (Ability to hold & manipulate information for short periods)",
    value: 0
  },
  {
    id: 4,
    name: "Processing Speed",
    value: 0
  },
  {
    id: 5,
    name: "Relevant Years of Experience",
    value: 0
  },
  {
    id: 6,
    name: "Professional Pedigree: Organizations",
    value: 0
  },
  {
    id: 7,
    name: "Academic Pedigree: Education",
    value: 0
  },
  {
    id: 8,
    name: "JD Specific(Must have): Research(Publications)",
    value: 0
  },
  {
    id: 9,
    name: "JD Specific(Must have): Deep Learning Algorithms",
    value: 0
  },
]

interface IF {
  id: number,
  name: string,
  value: number,
}

interface IFError extends IF {
  error: boolean
}

interface IFBoolean extends IF {
  paramNeeded: boolean
}

const AddIntelligenceFactorWeightage = () => {

  // Fetch exsisting IF
  const IntelligenceFactors = IF;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [intelligenceFactors, setIntelligenceFactors] = useState<IF[] | []>([]);

  const [intelligenceFactorsBoolean, setIntelligenceFactorsBoolean] = useState<IFBoolean[]>([]);

  const [intelligenceFactorsInputError, setIntelligenceFactorsInputError] = useState<IFError[]>([]);

  useLayoutEffect(() => {
    setIntelligenceFactorsInputError(IntelligenceFactors.map(factor => ({ ...factor, error: false })));

    setIntelligenceFactorsBoolean(IntelligenceFactors.map(factor => ({ ...factor, paramNeeded: false })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIntelligenceFactorsNeededChange = (value: boolean, elementNo: number) => {

    setIntelligenceFactorsBoolean(prevIF => {
      const index = prevIF.findIndex(factor => factor.id === elementNo);
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

  const onHandleIntelligenceFactorsNeededSubmit = () => {
    setIntelligenceFactors(intelligenceFactorsBoolean.filter(factor => factor.paramNeeded === true));
    setIsModalOpen(false);
  };

  const handleIntelligenceFactorsInputChange = (value: number, elementNo: number) => {

    if (value > 100 || isNaN(value)) {
      setIntelligenceFactorsInputError(prevErrors => {
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
      setIntelligenceFactorsInputError(prevErrors => {
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

    setIntelligenceFactors(prevIF => {
      const index = prevIF.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevIF.slice(0, index),
          {
            ...prevIF[index],
            value: value
          },
          ...prevIF.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevIF;
    });
  };

  const getValueByIdIntelligenceFactors = (id: number) => {
    const factor = intelligenceFactors.find(fact => fact.id === id);

    return factor?.value;
  };

  const checkErrorByIdIntelligenceFactors = (id: number) => {
    const factor = intelligenceFactorsInputError.find(fact => fact.id === id);

    return factor ? factor?.error : false;
  };

  const getSelectValueIntelligenceFactorsBoolean = (id: number) => {
    return intelligenceFactorsBoolean.find(factor => factor.id === id)?.paramNeeded.toString() || 'false';
  };

  return <>
    {isModalOpen &&
      <>
        <Modal
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onHandleSubmit={onHandleIntelligenceFactorsNeededSubmit}
        >
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold capitalize relative'>
              <span className='border-b border-gray-500'>Intelligence Factors:</span>
            </h2>
            <div>
              {intelligenceFactorsBoolean?.map((detail) => (
                <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
                  <p className='text-[16px] leading-tight font-semibold self-center'>
                    {detail.name}:
                  </p>
                  <Select
                    id={`intelligence_factor_choose${detail.name}`}
                    value={getSelectValueIntelligenceFactorsBoolean(detail.id)}
                    options={[
                      {
                        value: getSelectValueIntelligenceFactorsBoolean(detail.id),
                        text: getSelectValueIntelligenceFactorsBoolean(detail.id)
                      },
                      {
                        value: getSelectValueIntelligenceFactorsBoolean(detail.id) === 'true' ? 'false' : 'true',
                        text: getSelectValueIntelligenceFactorsBoolean(detail.id) === 'true' ? 'false' : 'true'
                      }
                    ]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleIntelligenceFactorsNeededChange(e.target.value === 'true', detail.id)}
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
            <span className='border-b border-gray-500'>Intelligence Factors:</span>
          </h2>
          <div className='pt-1.5' onClick={() => setIsModalOpen(true)}>
            <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
          </div>

        </div>
        <div>
          {intelligenceFactors?.map((detail) => (
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

export default AddIntelligenceFactorWeightage