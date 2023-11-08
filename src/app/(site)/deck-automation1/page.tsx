'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { ChangeEvent, useEffect, useState } from 'react';

import Input from './Components/Input';
import ProgressBar from './Components/ProgressBar';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface CandidateInfo {
  name: string,
  info: string[],
  photo: string,
  social: string,
}

const steps = [
  'Company Information Form',
  'Candidate Information Form',
  'Weightage Form',
  'Scores Form',
];

const Page = () => {
  const session = useSession();

  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [companyInformation, setCompanyInformation] = useState({ companyName, role });

  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo[]>();
  const [inputCount, setInputCount] = useState(0);

  if (session.status === "unauthenticated") {
    router.replace('/');
  }

  const handleAddCandidate = () => {
    setError(false);

    setInputCount(prevCount => prevCount + 1);

    setCandidateInfo(prevCandidateInfo => [...(prevCandidateInfo || []), { name: '', info: [''], photo: '', social: '' }]);
  };

  const handleDeleteCandidate = (index: number) => {
    setInputCount(prevCount => Math.max(0, prevCount - 1));

    setCandidateInfo(prevCandidateInfo =>
      prevCandidateInfo?.filter((_, i) => i !== index - 1)
    );
  };

  const handleInputChange = (index: number, value: string, field: string) => {
    if (!candidateInfo) {
      // Initialize the candidateInfo array if it's undefined
      setCandidateInfo([]);
      return;
    }

    const updatedCandidateInfo = [...candidateInfo];
    updatedCandidateInfo[index - 1] = { ...updatedCandidateInfo[index - 1], [field]: value };
    setCandidateInfo(updatedCandidateInfo);
  };

  const renderCandidateInputs = () => {
    const inputs = [];
    for (let i = 1; i <= inputCount; i++) {
      inputs.push(
        <div key={`candidate_info_${i}`}>
          <div className='space-y-3 flex flex-col '>
            <div className='flex flex-row justify-between '>
              <h2 className='font-bold '>Candidate Information {i}</h2>
              <button onClick={() => handleDeleteCandidate(i)} className='font-semibold opacity-70 flex '>
                <span className='opacity-50'>
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="30" height="30" viewBox="0 0 256.000000 256.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
                      fill="#000000" stroke="none">
                      <path d="M1090 2269 c-80 -36 -111 -77 -139 -183 -25 -94 -39 -100 -232 -104 -157 -3 -159 -4 -179 -29 -27 -34 -25 -69 5 -98 l24 -25 711 0 711 0 24 25 c30 29 32 64 5 98 -20 25 -22 26 -179 29 -193 4 -207 10 -232 104 -28 106 -59 147 -139 183 -39 18 -65 21 -190 21 -125 0 -151 -3 -190 -21z m320 -144 c22 -11 33 -28 45 -67 25 -84 37 -78 -175 -78 -212 0 -200 -6 -175 78 21 71 43 81 173 82 73 0 112 -4 132 -15z" />
                      <path d="M650 1640 c-17 -17 -20 -33 -20 -112 0 -154 29 -941 36 -973 18 -87 94 -177 183 -219 44 -20 59 -21 431 -21 372 0 387 1 431 21 89 42 165 132 183 219 7 32 36 819 36 973 0 79 -3 95 -20 112 -26 26 -83 27 -109 1 -22 -22 -26 -78 -42 -631 -6 -212 -15 -401 -20 -421 -11 -45 -41 -84 -82 -107 -29 -15 -69 -17 -377 -17 -308 0 -348 2 -377 17 -41 23 -71 62 -82 107 -5 20 -14 209 -20 421 -16 553 -20 609 -42 631 -26 26 -83 25 -109 -1z" />
                      <path d="M1031 1504 c-20 -26 -21 -38 -21 -389 0 -351 1 -363 21 -389 41 -53 121 -26 134 46 3 18 5 188 3 376 l-3 344 -24 19 c-35 28 -85 25 -110 -7z" />
                      <path d="M1427 1518 c-33 -26 -37 -66 -37 -402 0 -343 4 -387 40 -406 35 -19 77 -12 99 16 20 26 21 38 21 389 0 351 -1 363 -21 389 -23 29 -73 36 -102 14z" />
                    </g>
                  </svg>
                </span>
                <span className='pt-0.5 hover:underline'>Delete</span>
              </button>
            </div>
            <div className="space-y-6 pb-4" >
              <Input
                name='Full Name'
                id={`full_name_${i}`}
                placeholder={candidateInfo && candidateInfo[i - 1]?.name}
                required={true}
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[i - 1]?.name != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(i, e.target.value, 'name')}
              />
              <Input
                name='Social Network URL'
                id={`social_network_url_${i}`}
                placeholder={candidateInfo && candidateInfo[i - 1]?.social}
                required={true}
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[i - 1]?.social != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(i, e.target.value, 'social')}
              />
            </div>
          </div>
        </div>
      );
    }

    return inputs;
  }

  const [error, setError] = useState(false);

  const nextStep = () => {
    setCurrentStep((prevStep: number) => prevStep + 1);
  };

  const prevStep = () => {
    setError(false);

    setCurrentStep((prevStep: number) => prevStep - 1);

    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
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
        if (!candidateInfo || candidateInfo.length === 0) {
          setError(true);
          return;
        }

        for (const { name, photo, social, info } of candidateInfo) {
          if (!name || !photo || !social || (Array.isArray(info) && info.length === 1 && info[0] === '')) {
            setError(true);
            return;
          }
        }

        nextStep();
        break;

      case 2:
        console.log('submit for 2');
        break;
    }

    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  };

  return (
    <div className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl'>
        <div className='font-semibold p-2 border-b-2 border-gray-200 cursor-pointer md:block hidden' onClick={() => router.back()} >
          {'<-'} goback
        </div>
        <div className='max-w-screen-sm mx-auto md:pt-6 min-h-screen pt-4'>
          <div className='flex justify-center py-4'>
            <Image width={120} height={120} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " />
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />

          <div className='flex flex-col'>
            {
              currentStep === 0 &&
              <>

                {error &&
                  <div className='bg-red-500 p-4 text-white font-semibold rounded-md w-1/2 my-3 flex justify-between'>
                    Missing fields!
                    <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
                  </div>
                }

                <div className=" w-full mt-4 ">
                  {/* <span className='text-red-600 font-bold '>*</span> Indicates a required field */}
                  <div className="space-y-12">
                    <Input
                      name='Company Name'
                      id='company_name'
                      placeholder={companyName}
                      required={true}
                      type='text'
                      moveLabel={companyName != ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                    />

                    <Input
                      name='Role'
                      id='role'
                      placeholder={role}
                      required={true}
                      type='text'
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

                {error &&
                  <div className='bg-red-500 p-4 text-white font-semibold rounded-md w-1/2 my-3'>
                    Missing fields!
                  </div>
                }
                <div className='mt-4'>
                  <span className='text-red-600 font-bold '>*</span> Indicates a required field
                </div>

                <div className=" w-full mt-4 space-y-6 ">
                  <button className={`font-semibold p-2 border-2 border-gray-200 w-1/3}`} onClick={() => handleAddCandidate()}>
                    {!candidateInfo || candidateInfo?.length === 0 ? <>Add Candidate <span className='text-red-600 font-bold'>*</span></> : 'Add Another'}
                  </button>
                  <div className='space-y-3' id='render_candidate_inputs'>
                    {renderCandidateInputs()}
                  </div>
                </div>
              </>
            }
            {
              currentStep === 2 &&
              <>

                form 3
              </>
            }
            {
              currentStep === 3 &&
              <>
                form 4

              </>
            }
          </div>
        </div>

        <div className='flex justify-end border-t-2 border-gray-200 bg-white w-full py-6 gap-5 sticky bottom-0 md:pr-12 flex-col md:flex-row'>
          <button
            onClick={() => prevStep()}
            className={`${currentStep === 0 && 'hidden'} custom-brown-btn-bg-transparent`}
          >
            Go Back
          </button>
          <button
            onClick={() => handleNextStepClick(currentStep)}
            className={`${currentStep === 3 && 'hidden'} custom-brown-btn`}
          >
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