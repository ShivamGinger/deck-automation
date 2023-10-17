'use client';

import { endpoints } from '@/utils/endpoints';

import axios from 'axios';

import React, { ChangeEvent, useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import clsx from 'clsx';

import Input from './Components/Input';
import ProgressBar from './Components/ProgressBar';

const steps = [
  'Company Information',
  'Candidate Information',
  'Weightage',
  'Scores',
];

const Page = () => {

  const [currentStep, setCurrentStep] = useState(0);

  const { register, formState: { errors } } = useForm<FieldValues>();

  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [companyInformation, setCompanyInformation] = useState({ companyName, role });

  const [error, setError] = useState(false);

  const nextStep = () => {
    setCurrentStep((prevStep: number) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep: number) => prevStep - 1);
  };

  const handleNextStepClick = (currentStep: number) => {
    setError(false);

    switch (currentStep) {
      case 0:
        if (companyName.length === 0 || role.length === 0) {
          setError(true);
          return;
        }

        setCompanyInformation({ companyName, role });

        nextStep();
        break;
      case 1:
        console.log('submit for 1');
        break;
      case 2:
        console.log('submit for 2');
        break;
    }
  };

  return (
    <div>
      <div className='max-w-screen-lg mx-auto bg-white shadow-2xl'>
        <div className='p-2'>
          {'<-'}goback
        </div>
        <div className='max-w-screen-sm mx-auto md:pt-6 min-h-screen pt-4'>
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />

          <div className='flex flex-col'>
            {
              currentStep === 0 &&
              <>
                <h2 className='self-center font-bold text-2xl'>{steps[currentStep]}</h2>

                {error &&
                  <div className='bg-red-500 p-4 text-white font-semibold rounded-md w-1/2 my-3'>
                    Missing fields!
                  </div>
                }

                <div className=" w-full mt-4 space-y-6 ">
                  <span className='text-red-600 font-bold '>*</span> Indicates a required field
                  <div className="space-y-6">
                    <Input
                      name='Company Name'
                      id='company_name'
                      placeholder={companyName}
                      required={true}
                      moveLabel={companyName != ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                    />

                    <Input
                      name='Role'
                      id='role'
                      placeholder={role}
                      required={true}
                      moveLabel={role != ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                    />

                  </div>
                </div>
              </>
            }
            {
              currentStep === 1 &&
              <>
                <h2 className='self-center font-bold text-2xl'>{steps[currentStep]}</h2>

                {error &&
                  <div className='bg-red-500 p-4 text-white font-semibold rounded-md w-1/2 my-3'>
                    Missing fields!
                  </div>
                }

                <div className=" w-full mt-4 space-y-6 ">
                  <span className='text-red-600 font-bold '>*</span> Indicates a required field
                  <div className="space-y-6">
                    <Input
                      name='Candidate Info 1'
                      id='candidate_info_1'
                      placeholder={companyName}
                      required={true}
                      moveLabel={companyName != ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                    />


                  </div>
                </div>
              </>
            }
            {
              currentStep === 2 &&
              <>
                <h2 className='self-center font-bold text-2xl'>{steps[currentStep]}</h2>
                form 3
              </>
            }
            {
              currentStep === 3 &&
              <>
                <h2 className='self-center font-bold text-2xl'>{steps[currentStep]}</h2>
                form 4

              </>
            }
          </div>
        </div>
        <div className='flex justify-end border-t-2 border-gray-200 bg-white w-full py-6 px-2 gap-5 sticky bottom-0'>
          <button onClick={() => prevStep()} className={`${currentStep === 0 && 'hidden'} font-semibold p-2 border-2 border-gray-200`}>
            Go Back
          </button>
          <button onClick={() => handleNextStepClick(currentStep)} className={`${currentStep === 3 && 'hidden'} font-semibold p-2 border-2 border-gray-200`}>
            Save and Continue
          </button>
          <button onClick={() => nextStep()} className={`${currentStep === 3 ? 'font-semibold p-2 border-2 border-gray-200' : 'hidden'}`}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page