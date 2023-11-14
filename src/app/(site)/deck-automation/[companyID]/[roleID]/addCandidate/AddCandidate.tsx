"use client";

import Input from '@/app/(site)/Components/Input';
import ProfilePic from '@/app/(site)/Components/ProfilePic';
import Select from '@/app/(site)/Components/Select';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ExpAchiv from './Components/Candidate/ExpAchiv';
import KeyPoints from './Components/Candidate/KeyPoints';

import { AQArray, CandidateInfo, EFArray, HandleCandidateInputChangeValue, IF, IFArray, QuotientFactors, SFArray } from '@/utils/constants';
import { useParams } from 'next/navigation';
import QuotientParametersWeightage from './Components/Candidate/QuotientParametersWeightage';

function validateCandidates(candidateInfo: CandidateInfo[]) {
  for (const candidate of candidateInfo) {
    const {
      name,
      description,
      photo,
      gender,
      exp,
      exp_ctc,
      phone_no,
      email,
      social,
      key_points,
      exp_achi,
      inteli_fact: { parameters: inteli_parameters },
      emotional_fact: { parameters: emotional_parameters },
      social_fact: { parameters: social_parameters },
      adversity_quotient: { parameters: adversity_parameters }
    } = candidate;

    if (
      // !name ||
      // !description ||
      !photo
      // !gender ||
      // !exp ||
      // isNaN(parseFloat(exp_ctc)) ||
      // !phone_no ||
      // !email ||
      // !social ||
      // (Array.isArray(key_points) && key_points.length >= 1 && key_points.some(element => element === '')) ||
      // (Array.isArray(exp_achi) && exp_achi.length >= 1 && exp_achi.some(element => element === '')) ||
      // !validateParameters(inteli_parameters) || !validateParameters(emotional_parameters) ||
      // !validateParameters(social_parameters) || !validateParameters(adversity_parameters)
    ) {
      return false; // Invalid candidate
    }
  }
  return true; // All candidates are valid
};

function validateParameters(parameters: QuotientFactors[]) {
  for (const { value } of parameters) {
    if (value > 5 || value <= 0 || isNaN(value)) {
      return false;
    }
  }
  return true;
}

const AddCandidate = () => {
  const router = useRouter();

  const { roleID, companyID } = useParams();

  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo[]>([]);
  const [candidateInputCount, setCandidateInputCount] = useState(0);

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const AllIntelligenceFactors = IFArray;
  const AllAdversityQuotient = AQArray;
  const AllEmotionalFactor = EFArray;
  const AllSocialFactor = SFArray;

  console.log(candidateInfo);

  useEffect(() => {
    if (error) {
      const container = document.getElementById('side-body');

      if (container) {
        container.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }

    }
  }, [error]);

  const handleAddCandidate = () => {
    setError(false);

    if (!validateCandidates(candidateInfo)) {
      setErrorDetails('Fill details of Exsisting Candidate before adding new!');
      setError(true);
      return;
    }

    if (candidateInputCount === 10) {
      setErrorDetails("Can't add more Candidates!");
      setError(true);
      return;
    };

    setCandidateInputCount(prevCount => prevCount + 1);

    setCandidateInfo(prevCandidateInfo => [
      ...(prevCandidateInfo || []),
      {
        name: '',
        description: '',
        photo: '',
        gender: 'M',
        exp: '',
        exp_ctc: '',
        phone_no: '',
        email: '',
        social: '',
        exp_achi: [''],
        key_points: [''],
        inteli_fact: {
          id: 1,
          parameters: AllIntelligenceFactors
        },
        emotional_fact: {
          id: 2,
          parameters: AllEmotionalFactor
        },
        social_fact: {
          id: 3,
          parameters: AllSocialFactor
        },
        adversity_quotient: {
          id: 4,
          parameters: AllAdversityQuotient
        }
      }
    ]);
  };

  const handleDeleteCandidate = (index: number) => {
    setError(false);
    setCandidateInputCount(prevCount => Math.max(0, prevCount - 1));

    setCandidateInfo(prevCandidateInfo =>
      prevCandidateInfo?.filter((_, i) => i !== index - 1)
    );
  };

  const handleInputChange: HandleCandidateInputChangeValue = (index, value, field) => {
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
    for (let candidateNo = 1; candidateNo <= candidateInputCount; candidateNo++) {
      inputs.push(
        <div key={`candidate_info_${candidateNo}`}>
          <div className='flex flex-col '>
            <div className='flex flex-row justify-between '>
              <h2 className='font-bold'>Candidate Information {candidateNo}</h2>
              <button onClick={() => handleDeleteCandidate(candidateNo)} className='font-semibold opacity-70 flex '>
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
            <div className="pb-4" >
              <Input
                name='Full Name'
                id={`full_name_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.name}
                required
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[candidateNo - 1]?.name != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'name')}
              />
              <Input
                name='Small Description'
                id={`description_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.description}
                required
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[candidateNo - 1]?.description != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'description')}
              />

              {/* <div className='mt-6 flex flex-col w-72'>
                <div className='flex flex-row justify-between'>
                  <label htmlFor={`profile_pic_upload_${candidateNo}`} className='font-semibold pb-2'>Upload Profile Pic</label>
                  <div className='pr-2'>
                    tick
                  </div>
                </div>
                <input type="file" accept='image/*' id={`profile_pic_upload_${candidateNo}`} />
              </div> */}
              <ProfilePic
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                prevFileUploaded={candidateInfo[candidateNo - 1].photo}
                candidateName={candidateInfo[candidateNo - 1].name}
                setErrorDetails={setErrorDetails}
                setError={setError}
              />

              <Select
                title='Gender'
                id={`gender_${candidateNo}`}
                options={[{ value: 'M', text: 'Male' }, { value: 'F', text: 'Female' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(candidateNo, e.target.value, 'gender')}
                required
              />

              <Input
                name='Experience'
                id={`exp_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.exp}
                required
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[candidateNo - 1]?.exp != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'exp')}
              />

              <Input
                name='Expected CTC (eg: 2.65)'
                id={`exp_ctc_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.exp_ctc}
                required
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[candidateNo - 1]?.exp_ctc != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'exp_ctc')}
              />

              <Input
                name='Phone Number'
                id={`phn_no_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.phone_no}
                required
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[candidateNo - 1]?.phone_no != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'phone_no')}
              />

              <Input
                name='Email Address'
                id={`email_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.email}
                required
                type='email'
                moveLabel={!!candidateInfo && candidateInfo[candidateNo - 1]?.email != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'email')}
              />

              <Input
                name='Social Network URL'
                id={`social_network_url_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.social}
                required
                type='text'
                moveLabel={!!candidateInfo && candidateInfo[candidateNo - 1]?.social != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'social')}
              />

              <KeyPoints
                placeholderData={candidateInfo[candidateNo - 1].key_points}
                count={candidateInfo[candidateNo - 1].key_points.length}
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                error={error}
                setError={setError}
                setErrorDetails={setErrorDetails}
              />

              <ExpAchiv
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                error={error}
                setError={setError}
                setErrorDetails={setErrorDetails}
              />

              <QuotientParametersWeightage
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                AllParameters={AllIntelligenceFactors}
                factorID={1}
                factorName='inteli_fact'
                name="Intelligence Factor"
              />

              <QuotientParametersWeightage
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                AllParameters={AllEmotionalFactor}
                factorID={2}
                factorName='emotional_fact'
                name="Emotional Factor"
              />

              <QuotientParametersWeightage
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                AllParameters={AllSocialFactor}
                factorID={3}
                factorName='social_fact'
                name="Social Factor"
              />

              <QuotientParametersWeightage
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                AllParameters={AllAdversityQuotient}
                factorID={4}
                factorName='adversity_quotient'
                name="Adversity Quotient"
              />

            </div>
          </div>
        </div>
      );
    };

    return inputs;
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!candidateInfo || candidateInfo.length === 0 || !validateCandidates(candidateInfo)) {
      setErrorDetails('Missing Data');
      setError(true);
      return;
    };

    const response = await fetch('/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

      }),
      credentials: 'include',
    }
    );

    if (response.status === 409) {
      const errorData = await response.json();

      setError(true);
      setErrorDetails(errorData.error);
    } else if (response.status == 400) {
      const errorData = await response.json();

      setError(true);
      setErrorDetails(errorData.details[0].message);
    } else if (response.status === 200) {
      router.replace(`/deck-automation/${companyID}/${roleID}`);
    };
  };

  return <div>
    {error &&
      <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between'>
        {errorDeatils}
        <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
      </div>
    }
    <div className="space-y-12">
      <div className=" w-full mt-4 space-y-6 ">
        <button className={`font-semibold p-2 border-2 border-gray-200 w-1/3}`} onClick={() => handleAddCandidate()}>
          {!candidateInfo || candidateInfo?.length === 0 ? <> Add Candidate <span className='text-red-600 font-bold'>*</span></> : 'Add Another'}
        </button>
        <div className='space-y-3'>
          {renderCandidateInputs()}
        </div>
      </div>

    </div>
    <button
      onClick={handleSubmit}
      className={`${candidateInfo.length === 0 || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
      disabled={candidateInfo.length === 0 || error}
    >
      Submit
    </button>
  </div>
}

export default AddCandidate