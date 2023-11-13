"use client";

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useParams } from 'next/navigation';
import AddCandidate from './AddCandidate';
import AddQuotientWeightage from './Components/Parameters/AddQuotientWeightage';
import AddAdversityQuotientWeightage from './Components/Parameters/ParameterWeightage/AddAdversityQuotientWeightage';
import AddEmotionalFactorWeightage from './Components/Parameters/ParameterWeightage/AddEmotionalFactorWeightage';
import AddIntelligenceFactorWeightage from './Components/Parameters/ParameterWeightage/AddIntelligenceFactorWeightage';
import AddSocialFactorWeightage from './Components/Parameters/ParameterWeightage/AddSocialFactorWeightage';
import ProgressBar from './Components/Parameters/ProgressBar';

const steps = [
  'Quotient Weightage',
  'Intelligence Factor Weightage',
  'Emotional Factor Weightage',
  'Social Factor Weightage',
  'Adversity Quotient Weightage',
  'Add Candidate',
];

const AddRoleDetails = () => {
  const { companyID, roleID } = useParams();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(5);

  return (
    <>
      <section className='bg-[#FEFAEF] '>
        <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
          <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}/${roleID}`)}>
            {'<'}
          </div>
          <div className='flex justify-center py-12 flex-col items-center gap-12'>
            <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />

            <div className='w-2/5 relative'>
              <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />

            </div>

            <div>
              {currentStep === 0 &&
                <AddQuotientWeightage setCurrentStep={setCurrentStep} />
              }

              {currentStep === 1 &&
                <AddIntelligenceFactorWeightage setCurrentStep={setCurrentStep} />
              }

              {currentStep === 2 &&
                <AddEmotionalFactorWeightage setCurrentStep={setCurrentStep} />
              }

              {currentStep === 3 &&
                <AddSocialFactorWeightage setCurrentStep={setCurrentStep} />
              }

              {currentStep === 4 &&
                <AddAdversityQuotientWeightage setCurrentStep={setCurrentStep} />
              }

              {currentStep === 5 &&
                <AddCandidate />
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddRoleDetails