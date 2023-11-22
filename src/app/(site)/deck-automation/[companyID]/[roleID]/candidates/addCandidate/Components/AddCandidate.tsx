"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';
import ProfilePic from '@/app/(site)/Components/ProfilePic';
import Select from '@/app/(site)/Components/Select';

import { isValidDecimalNumber, isValidEmail } from '@/app/(site)/Components/Candidate/validationFunctions';
import { AddCandidateInformation, HandleCandidateInputChangeValue, ParametersQuotientFactorsValue, QuotientFactorsWeightage } from '@/utils/types';
import ExpAchiv from './ExpAchiv';
import KeyPoints from './KeyPoints';
import ParameterQuotient from './ParameterQuotient';
import { validateCandidates } from './validationFunctions';

const AddCandidate = ({
  quotientsDetailsUnderRole,
  parametersUnderQuotients
}: {
  quotientsDetailsUnderRole: QuotientFactorsWeightage[],
  parametersUnderQuotients: ParametersQuotientFactorsValue[]
}) => {
  const router = useRouter();

  const { companyID, roleID } = useParams();

  const [candidateInfo, setCandidateInfo] = useState<AddCandidateInformation[]>([]);
  const [candidateInputCount, setCandidateInputCount] = useState(0);

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

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
      setErrorDetails('Exsisting Candidate details are Missing / Invalid !');
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
      ...(prevCandidateInfo),
      {
        candidate_name: '',
        key_points: [''],
        profile_pic: '',
        social: '',
        email: '',
        current_position: '',
        current_location: '',
        experience: '',
        phone_number: '',
        fixed_lpa: '',
        variable_lpa: '',
        expected_ctc: '',
        notice_period: '',
        description: '',
        achievement: [''],
        gender: 'male',
        current_company: '',
        esop_rsu: '',
        candidate_parameter_scores: parametersUnderQuotients.map(parameter => {
          const matchingQuotient = quotientsDetailsUnderRole.find(
            (quotient) =>
              parameter.quotient_id === quotient.quotient_id && parameter.role_id === quotient.role_id
          );

          return {
            ...parameter,
            quotient_weightage: matchingQuotient?.quotient_weightage as number,
            quotient_weightage_id: matchingQuotient?.quotient_weightage_id as number
          }
        }),
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
                placeholder={candidateInfo[candidateNo - 1]?.candidate_name}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.candidate_name != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'candidate_name')}
              />
              <Input
                name='Small Description'
                id={`description_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.description}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.description != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'description')}
              />

              <ProfilePic
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                prevFileUploaded={candidateInfo[candidateNo - 1].profile_pic}
                candidateName={candidateInfo[candidateNo - 1].candidate_name}
                setErrorDetails={setErrorDetails}
                setError={setError}
              />

              <Select
                title='Gender'
                id={`gender_${candidateNo}`}
                options={[{ value: 'male', text: 'Male' }, { value: 'female', text: 'Female' }, { value: 'other', text: 'Other' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(candidateNo, e.target.value, 'gender')}
                required
              />

              <Input
                name='Current Role'
                id={`curr_role_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.current_position}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.current_position != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'current_position')}
              />

              <Input
                name='Current Location'
                id={`curr_location_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.current_location}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.current_location != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'current_location')}
              />

              <Input
                name='Experience'
                id={`exp_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.experience}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.experience != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'experience')}
              />

              <Input
                name='Expected CTC'
                id={`exp_ctc_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.expected_ctc}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.expected_ctc != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'expected_ctc')}
              />

              <Input
                name='Current CTC (eg: 2.65)'
                id={`exp_ctc_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.fixed_lpa}
                error={!isValidDecimalNumber(candidateInfo[candidateNo - 1]?.fixed_lpa)}
                required
                type='text'
                moveLabel={String(candidateInfo[candidateNo - 1]?.fixed_lpa) != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'fixed_lpa')}
              />

              <Input
                name='Variable CTC (eg: 2.65)'
                id={`exp_ctc_${candidateNo}`}
                placeholder={String(candidateInfo[candidateNo - 1]?.variable_lpa)}
                required
                error={!isValidDecimalNumber(candidateInfo[candidateNo - 1]?.variable_lpa)}
                type='text'
                moveLabel={String(candidateInfo[candidateNo - 1]?.variable_lpa) != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'variable_lpa')}
              />

              <Input
                name='Phone Number'
                id={`phn_no_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.phone_number}
                required
                error={candidateInfo[candidateNo - 1]?.phone_number.length < 10 || candidateInfo[candidateNo - 1]?.phone_number.length > 15}
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.phone_number != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'phone_number')}
              />

              <Input
                name='Email Address'
                id={`email_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.email}
                required
                type='email'
                error={!isValidEmail(candidateInfo[candidateNo - 1]?.email)}
                moveLabel={candidateInfo[candidateNo - 1]?.email != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'email')}
              />

              <Input
                name='Notice Period'
                id={`notice_period_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.notice_period}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.notice_period != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'notice_period')}
              />

              <Input
                name='Current Company'
                id={`curr_cmp_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.current_company}
                required={false}
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.current_company != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'current_company')}
              />

              <Input
                name='ESOP/RSU'
                id={`esop_rsu_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.esop_rsu}
                required={false}
                type='text'
                error={candidateInfo[candidateNo - 1]?.esop_rsu != '' && !isValidDecimalNumber(candidateInfo[candidateNo - 1]?.esop_rsu)}
                moveLabel={candidateInfo[candidateNo - 1]?.esop_rsu != ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(candidateNo, e.target.value, 'esop_rsu')}
              />

              <Input
                name='Social Network URL'
                id={`social_network_url_${candidateNo}`}
                placeholder={candidateInfo[candidateNo - 1]?.social}
                required
                type='text'
                moveLabel={candidateInfo[candidateNo - 1]?.social != ''}
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
                placeholderData={candidateInfo[candidateNo - 1].achievement}
                count={candidateInfo[candidateNo - 1].achievement.length}
                handleInputChange={handleInputChange}
                candidateNo={candidateNo}
                error={error}
                setError={setError}
                setErrorDetails={setErrorDetails}
              />

              <div className='flex flex-col my-4'>
                {quotientsDetailsUnderRole.map(({ quotient_id, quotient_name }, index) => (
                  <div key={index}>
                    <h2 className='text-xl font-bold capitalize pb-2'>
                      <span className='border-b border-gray-500'>{quotient_name} Values:</span>
                    </h2>
                    <div className='pb-2'>
                      {
                        parametersUnderQuotients
                          .filter(param => param.quotient_id === quotient_id)
                          .map(({ parameter_id, parameter_name }, index) => (
                            <div key={index}>
                              <ParameterQuotient
                                parameterId={parameter_id}
                                parameterName={parameter_name}
                                parameterValue={candidateInfo[candidateNo - 1].candidate_parameter_scores.filter(param => param.parameter_id === parameter_id)[0]?.parameter_score}
                                handleInputChange={handleInputChange}
                                parameterDetails={candidateInfo[candidateNo - 1].candidate_parameter_scores}
                                candidateNo={candidateNo}
                              />
                            </div>
                          ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div >
      );
    };

    return inputs;
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!candidateInfo || candidateInfo.length === 0 || !validateCandidates(candidateInfo)) {
      setErrorDetails('Missing / Invalid Data!');
      setError(true);
      return;
    };

    const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/role_candidates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidate_information: candidateInfo.map(candidate => ({
          ...candidate,
          share_candidate_status: false,
          candidate_status: null,
          fixed_lpa: parseFloat(candidate.fixed_lpa),
          variable_lpa: parseFloat(candidate.variable_lpa),
          esop_rsu: parseFloat(candidate.esop_rsu)
        }))
      }),
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();

      router.replace(`/deck-automation/${companyID}/${roleID}/candidates`);

    } else {
      const errorData = await response.json();
      console.log(errorData);

      setError(true);
      setErrorDetails(errorData.error);
    }
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