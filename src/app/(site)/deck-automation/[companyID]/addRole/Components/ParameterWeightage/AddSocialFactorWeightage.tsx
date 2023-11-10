"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';

import Input from './Components/Input';
import Modal from './Components/Modal';
import Select from './Components/Select';

const SF = [
  {
    id: 1,
    name: "Strength of Network",
    value: 0
  },
  {
    id: 2,
    name: "Ability to attract talent",
    value: 0
  }
]

interface SF {
  id: number,
  name: string,
  value: number,
}

interface SFError extends SF {
  error: boolean
}

interface SFBoolean extends SF {
  paramNeeded: boolean
}

const AddSocialFactorWeightage = () => {

  // Fetch exsisting SF
  const SocialFactors = SF;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [socialFactors, setSocialFactors] = useState<SF[] | []>([]);

  const [socialFactorsBoolean, setSocialFactorsBoolean] = useState<SFBoolean[]>([]);

  const [socialFactorsInputError, setSocialFactorsInputError] = useState<SFError[]>([]);

  useLayoutEffect(() => {
    setSocialFactorsInputError(SocialFactors.map(factor => ({ ...factor, error: false })));

    setSocialFactorsBoolean(SocialFactors.map(factor => ({ ...factor, paramNeeded: false })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSocialFactorsNeededChange = (value: boolean, elementNo: number) => {

    setSocialFactorsBoolean(prevSF => {
      const index = prevSF.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevSF.slice(0, index),
          {
            ...prevSF[index],
            paramNeeded: value
          },
          ...prevSF.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevSF;
    });

  };

  const onHandleSocialFactorsNeededSubmit = () => {
    setSocialFactors(socialFactorsBoolean.filter(factor => factor.paramNeeded === true));
    setIsModalOpen(false);
  };

  const handleSocialFactorsInputChange = (value: number, elementNo: number) => {

    if (value > 100 || isNaN(value)) {
      setSocialFactorsInputError(prevErrors => {
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
      setSocialFactorsInputError(prevErrors => {
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

    setSocialFactors(prevSF => {
      const index = prevSF.findIndex(factor => factor.id === elementNo);
      if (index !== -1) {

        const updatedFactors = [
          ...prevSF.slice(0, index),
          {
            ...prevSF[index],
            value: value
          },
          ...prevSF.slice(index + 1)
        ];

        return updatedFactors;
      }

      return prevSF;
    });
  };

  const getValueByIdSocialFactors = (id: number) => {
    const factor = socialFactors.find(fact => fact.id === id);

    return factor?.value;
  };

  const checkErrorByIdSocialFactors = (id: number) => {
    const factor = socialFactorsInputError.find(fact => fact.id === id);

    return factor ? factor?.error : false;
  };

  const getSelectValueSocialFactorsBoolean = (id: number) => {
    return socialFactorsBoolean.find(factor => factor.id === id)?.paramNeeded.toString() || 'false';
  };

  return <>
    {isModalOpen &&
      <>
        <Modal
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onHandleSubmit={onHandleSocialFactorsNeededSubmit}
        >
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold capitalize relative'>
              <span className='border-b border-gray-500'>Social Factors:</span>
            </h2>
            <div>
              {socialFactorsBoolean?.map((detail) => (
                <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
                  <p className='text-[16px] leading-tight font-semibold self-center'>
                    {detail.name}:
                  </p>
                  <Select
                    id={`intelligence_factor_choose${detail.name}`}
                    value={getSelectValueSocialFactorsBoolean(detail.id)}
                    options={[
                      {
                        value: getSelectValueSocialFactorsBoolean(detail.id),
                        text: getSelectValueSocialFactorsBoolean(detail.id)
                      },
                      {
                        value: getSelectValueSocialFactorsBoolean(detail.id) === 'true' ? 'false' : 'true',
                        text: getSelectValueSocialFactorsBoolean(detail.id) === 'true' ? 'false' : 'true'
                      }
                    ]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSocialFactorsNeededChange(e.target.value === 'true', detail.id)}
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
            <span className='border-b border-gray-500'>Social Factors:</span>
          </h2>
          <div className='pt-1.5' onClick={() => setIsModalOpen(true)}>
            <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
          </div>

        </div>
        <div>
          {socialFactors?.map((detail) => (
            <div key={detail.id} className='flex flex-row justify-between pb-4 gap-4'>
              <p className='text-[16px] leading-tight font-semibold self-center'>
                {detail.name}:
              </p>
              <Input
                id={`intelligence_factor_${detail.name}`}
                placeholder={String(getValueByIdSocialFactors(detail.id))}
                required={true}
                moveLabel={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSocialFactorsInputChange(parseInt(e.currentTarget.value), detail.id)}
                error={checkErrorByIdSocialFactors(detail.id)}
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

export default AddSocialFactorWeightage