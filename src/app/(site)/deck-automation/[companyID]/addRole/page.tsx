"use client";

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ProgressBar from './Components/ProgressBar';

import AddQuotientWeightage from './Components/AddQuotientWeightage';
import AddRole from './Components/AddRole';
import AddEmotionalFactorWeightage from './Components/ParameterWeightage/AddEmotionalFactorWeightage';
import AddIntelligenceFactorWeightage from './Components/ParameterWeightage/AddIntelligenceFactorWeightage';
import AddSocialFactorWeightage from './Components/ParameterWeightage/AddSocialFactorWeightage';
import AddAdversityQuotientWeightage from './Components/ParameterWeightage/AddAdversityQuotientWeightage';


const steps = [
  'Add Role',
  'Quotient Weightage',
  'Intelligence Factor Weightage',
  'Emotional Factor Weightage',
  'Social Factor Weightage',
  'Adversity Quotient Weightage',
];

const AddRoleDetails = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <section className='bg-[#FEFAEF] '>
        <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
          <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.back()}>
            {'<'}
          </div>
          <div className='flex justify-center py-12 flex-col items-center gap-12'>
            <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
            {/* <h1 className='text-xl font-bold uppercase'>Add Role</h1> */}

            <div className='w-2/5 relative'>
              <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />

            </div>

            <div>
              {currentStep === 0 &&
                <AddRole setCurrentStep={setCurrentStep} />
              }

              {currentStep === 1 &&
                <AddQuotientWeightage setCurrentStep={setCurrentStep} />
              }

              {currentStep === 2 &&
                <AddIntelligenceFactorWeightage />
              }

              {currentStep === 3 &&
                <AddEmotionalFactorWeightage />
              }

              {currentStep === 4 &&
                <AddSocialFactorWeightage />
              }

              {currentStep === 5 &&
                <AddAdversityQuotientWeightage />
              }

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddRoleDetails