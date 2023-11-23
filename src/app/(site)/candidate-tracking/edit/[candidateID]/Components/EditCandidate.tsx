"use client";

import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { isValidDateFormat, isValidDecimalNumber, isValidEmail, isValidNumber, validateEditTrackingCandidates, } from '@/app/(site)/Components/Candidate/validationFunctions';
import Input from '@/app/(site)/Components/Input';
import Select from '@/app/(site)/Components/Select';
import { CandidateTrackingStatus, CompanyDetailsRoleCount, EditCandidateTrackingInformation, HandleEditCandidateInputChangeValue, RoleDetails } from '@/utils/types';
import CustomSelect from '../../../addCandidate/Components/Components/CustomSelect';
import AddExpAchiv from './AddExpAchiv';
import AddKeyPoints from './AddKeyPoints';
import EditCustomSelectCompany from './EditCustomSelectCompany';
import EditCustomSelectRole from './EditCustomSelectRole';
import EditKeyPoints from './EditKeyPoints';
import ProfilePicEditCandidate from './ProfilePicEditCandidate';


const EditCandidate = ({
  candidates
}: {
  candidates: EditCandidateTrackingInformation
}) => {
  const router = useRouter();

  const { candidateID } = useParams();

  const [candidateInfo, setCandidateInfo] = useState<EditCandidateTrackingInformation>(candidates);

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const [showAddStatus, setShowAddStatus] = useState(
    !(candidateInfo?.candidate_status || candidateInfo?.candidate_profile_share_date ||
      candidateInfo?.candidate_round_completed || candidateInfo?.candidate_reject_reason));

  const [showCompany, setshowCompany] = useState((candidateInfo.company_id && candidateInfo.role_id));
  const [addCompany, setAddCompany] = useState(false);
  const [companiesData, setCompaniesData] = useState<CompanyDetailsRoleCount[]>([]);

  const [rolesData, setRolesData] = useState<RoleDetails[]>([]);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setCompaniesData(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (addCompany) {
      handleInputChange(companiesData[0]?.company_id, 'company_id');

    } else {
      handleInputChange(null, 'company_id');
      handleInputChange(null, 'role_id');
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [addCompany]);

  useEffect(() => {
    setRolesData([]);

    const getData = async () => {
      try {
        if (candidateInfo.company_id) {
          const response = await fetch(`/api/companies/${candidateInfo.company_id}/roles`, {
            method: 'GET'
          });

          if (response.ok) {
            const data = await response.json();

            setRolesData(data.data);
            handleInputChange(data.data[0]?.role_id, 'role_id');
          }
        }

      } catch (err) {
        console.log(err);
      }
    }
    getData();

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [candidateInfo.company_id]);

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

  const handleInputChange: HandleEditCandidateInputChangeValue = (value, field) => {
    if (!candidateInfo) {
      return;
    };

    const updatedCandidate = { ...candidateInfo, [field]: value };

    setCandidateInfo(updatedCandidate);
  };

  const getShowCandidateStatus = () => {
    return showAddStatus ? 'true' : 'false'
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!candidateInfo || !validateEditTrackingCandidates(showAddStatus, candidateInfo)) {
      setErrorDetails('Missing / Invalid Data!');
      setError(true);
      return;
    };

    try {
      const response = await fetch(`/api/candidates/${candidateID}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...candidateInfo,
          esop_rsu: candidateInfo.esop_rsu ? parseFloat(candidateInfo.esop_rsu) : null,
          fixed_lpa: candidateInfo.fixed_lpa ? parseFloat(candidateInfo.fixed_lpa) : null,
          variable_lpa: candidateInfo.variable_lpa ? parseFloat(candidateInfo.variable_lpa) : null,
          company_id: candidateInfo.company_id,
          role_id: candidateInfo.role_id,
          candidate_round_completed: candidateInfo.candidate_round_completed ? parseInt(candidateInfo.candidate_round_completed) : null,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        router.replace('/candidate-tracking');

      } else {
        const errorData = await response.json();

        setError(true);
        setErrorDetails(errorData.error);
      }

    } catch (err) {
      console.log(err);
    }
  };

  console.log(candidateInfo);

  return <div>
    {error &&
      <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between'>
        {errorDeatils}
        <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
      </div>
    }
    {candidateInfo &&
      <div className="space-y-12">
        <div className=" w-full mt-4 space-y-6 ">
          <div className='space-y-3'>
            <div key={`candidate_info`}>
              <div className='flex flex-col '>
                <div className='flex flex-row justify-between '>
                  <h2 className='font-bold'>Edit Candidate Information</h2>
                </div>
                <div className="pb-4" >
                  <Input
                    name='Full Name'
                    id={`full_name`}
                    placeholder={candidateInfo?.candidate_name}
                    required
                    type='text'
                    error={candidateInfo?.candidate_name === ''}
                    moveLabel={candidateInfo?.candidate_name != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'candidate_name')}
                  />
                  <Input
                    name='Small Description'
                    id={`description`}
                    placeholder={candidateInfo?.description}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.description != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'description')}
                  />

                  <ProfilePicEditCandidate
                    handleInputChange={handleInputChange}
                    prevFileUploaded={candidateInfo && candidateInfo?.profile_pic}
                    candidateName={candidateInfo && candidateInfo?.candidate_name}
                    setErrorDetails={setErrorDetails}
                    setError={setError}
                  />

                  <Select
                    title='Gender'
                    id={`gender`}
                    options={[{ value: 'male', text: 'Male' }, { value: 'female', text: 'Female' }, { value: 'other', text: 'Other' }]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'gender')}
                    required
                  />

                  <Input
                    name='Current Role'
                    id={`curr_role`}
                    placeholder={candidateInfo?.current_position}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.current_position != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'current_position')}
                  />

                  <Input
                    name='Current Location'
                    id={`curr_location`}
                    placeholder={candidateInfo?.current_location}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.current_location != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'current_location')}
                  />

                  <Input
                    name='Experience'
                    id={`exp`}
                    placeholder={candidateInfo?.experience}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.experience != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'experience')}
                  />

                  <Input
                    name='Expected CTC'
                    id={`exp_ctc`}
                    placeholder={candidateInfo?.expected_ctc}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.expected_ctc != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'expected_ctc')}
                  />

                  <Input
                    name='Current CTC (eg: 2.65)'
                    id={`exp_ctc`}
                    placeholder={candidateInfo?.fixed_lpa}
                    error={String(candidateInfo?.fixed_lpa) != '' && !isValidDecimalNumber(candidateInfo?.fixed_lpa as string)}
                    required={false}
                    type='text'
                    moveLabel={String(candidateInfo?.fixed_lpa) != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'fixed_lpa')}
                  />

                  <Input
                    name='Variable CTC (eg: 2.65)'
                    id={`exp_ctc`}
                    placeholder={String(candidateInfo?.variable_lpa)}
                    required={false}
                    error={String(candidateInfo?.variable_lpa) != '' && !isValidDecimalNumber(candidateInfo?.variable_lpa as string)}
                    type='text'
                    moveLabel={String(candidateInfo?.variable_lpa) != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'variable_lpa')}
                  />

                  <Input
                    name='Phone Number'
                    id={`phn_no`}
                    placeholder={candidateInfo?.phone_number}
                    required
                    error={candidateInfo && (candidateInfo?.phone_number.length < 10 || candidateInfo?.phone_number.length > 15)}
                    type='text'
                    moveLabel={candidateInfo?.phone_number != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'phone_number')}
                  />

                  <Input
                    name='Email Address'
                    id={`email`}
                    placeholder={candidateInfo?.email}
                    required
                    type='email'
                    error={!isValidEmail(candidateInfo?.email as string)}
                    moveLabel={candidateInfo?.email != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'email')}
                  />

                  <Input
                    name='Social Network URL'
                    id={`social_network_url`}
                    placeholder={candidateInfo?.social}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.social != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'social')}
                  />

                  <Input
                    name='Notice Period'
                    id={`notice_period`}
                    placeholder={candidateInfo?.notice_period}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.notice_period != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'notice_period')}
                  />

                  <Input
                    name='Current Company'
                    id={`curr_cmp`}
                    placeholder={candidateInfo?.current_company}
                    required={false}
                    type='text'
                    moveLabel={candidateInfo?.current_company != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'current_company')}
                  />

                  <Input
                    name='ESOP/RSU'
                    id={`esop_rsu`}
                    placeholder={candidateInfo?.esop_rsu}
                    required={false}
                    type='text'
                    error={candidateInfo?.esop_rsu != '' && !isValidDecimalNumber(candidateInfo?.esop_rsu as string)}
                    moveLabel={candidateInfo?.esop_rsu != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'esop_rsu')}
                  />

                  {Array.isArray(candidateInfo.key_points) ?
                    <>
                      <AddKeyPoints
                        placeholderData={candidateInfo && candidateInfo?.key_points}
                        count={candidateInfo && candidateInfo?.key_points.length}
                        handleInputChange={handleInputChange}
                        error={error}
                        setError={setError}
                        setErrorDetails={setErrorDetails}
                      />
                    </> :
                    <>
                      <EditKeyPoints
                        keyPointsData={candidateInfo && candidateInfo?.key_points.keyPoints}
                        placeholderData={candidateInfo && candidateInfo?.key_points.keyPoints}
                        count={candidateInfo && candidateInfo?.key_points.keyPoints.length}
                        handleInputChange={handleInputChange}
                        error={error}
                        setError={setError}
                        setErrorDetails={setErrorDetails}
                      />
                    </>
                  }

                  {Array.isArray(candidateInfo.achievement) ?
                    <>
                      <AddExpAchiv
                        placeholderData={candidateInfo && candidateInfo?.achievement}
                        count={candidateInfo && candidateInfo?.achievement.length}
                        handleInputChange={handleInputChange}
                        error={error}
                        setError={setError}
                        setErrorDetails={setErrorDetails}
                      />
                    </> :
                    <>
                      edit kro
                    </>
                  }

                  {
                    (candidateInfo?.candidate_status || candidateInfo?.candidate_profile_share_date ||
                      candidateInfo?.candidate_round_completed || candidateInfo?.candidate_reject_reason) && !showAddStatus ?
                      <>
                        <label className={`font-semibold flex justify-between pt-4 underline text-lg`}>
                          Details for Candidate Status:
                        </label>
                        <Input
                          name='Profile Share Date (YYYY/MM/DD)' id={`candidate_profile`}
                          placeholder={candidateInfo?.candidate_profile_share_date}
                          required={false}
                          type='text'
                          error={candidateInfo?.candidate_profile_share_date != '' && !isValidDateFormat(candidateInfo?.candidate_profile_share_date)}
                          moveLabel={candidateInfo?.candidate_profile_share_date != ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'candidate_profile_share_date')}
                        />

                        <Input
                          name='Reason Rejected'
                          id={`candidate_profile`}
                          placeholder={candidateInfo?.candidate_reject_reason}
                          required={false}
                          type='text'
                          moveLabel={candidateInfo?.candidate_reject_reason != ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'candidate_reject_reason')}
                        />

                        <Input
                          name='Round Done (eg: 1)'
                          id={`candidate_profile`}
                          placeholder={candidateInfo?.candidate_round_completed}
                          required={false}
                          type='text'
                          error={candidateInfo?.candidate_round_completed != '' && !isValidNumber(candidateInfo?.candidate_round_completed)}
                          moveLabel={candidateInfo?.candidate_round_completed != ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'candidate_round_completed')}
                        />

                        <div className='flex flex-row justify-between pt-4 gap-4'>
                          <p className='text-[16px] leading-tight font-semibold self-center'>
                            Status
                            { }
                          </p>
                          <CustomSelect
                            id={`candidate_status_choose`}
                            value={candidateInfo.candidate_status}
                            options={[
                              { value: 'yet_to_share', text: 'Yet To Share' },
                              { value: 'joined', text: 'Joined' },
                              { value: 'negotiation', text: 'Negotiation' },
                              { value: 'on_hold', text: 'On Hold' },
                              { value: 'feedback_pending', text: 'Feedback Pending' },
                              { value: 'dropped_out', text: 'Dropped Out' },
                              { value: 'rejected', text: 'Rejected' },
                              { value: 'in_process', text: 'In Process' },]}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                              handleInputChange(e.target.value as CandidateTrackingStatus, 'candidate_status')}
                            required
                          />
                        </div>
                      </> :
                      <>
                        <div>
                          <div className='flex flex-row justify-between pt-4 gap-4'>
                            <p className='text-[16px] leading-tight font-semibold self-center'>
                              Add Status Details?
                            </p>
                            <CustomSelect
                              id={`candidate_status_choose`}
                              value={getShowCandidateStatus()}
                              options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) => setShowAddStatus(prev => !prev)}
                              required
                            />
                          </div>
                        </div>
                        {showAddStatus &&
                          <>
                            <label className={`font-semibold flex justify-between pt-4 underline text-lg`}>
                              Details for Candidate Status:
                            </label>
                            <Input name='Profile Share Date (YYYY/MM/DD)'
                              id={`candidate_profile`}
                              placeholder={!!candidateInfo.candidate_profile_share_date ? candidateInfo?.candidate_profile_share_date : ''}
                              required={false}
                              type='text'
                              error={!!candidateInfo.candidate_profile_share_date && candidateInfo?.candidate_profile_share_date != '' && !isValidDateFormat(candidateInfo?.candidate_profile_share_date)}
                              moveLabel={candidateInfo?.candidate_profile_share_date != ''}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'candidate_profile_share_date')}
                            />

                            <Input name='Reason Rejected'
                              id={`candidate_profile`}
                              placeholder={!!candidateInfo.candidate_reject_reason ? candidateInfo?.candidate_reject_reason : ''}
                              required={false}
                              type='text'
                              moveLabel={candidateInfo?.candidate_reject_reason != ''}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'candidate_reject_reason')}
                            />

                            <Input name='Round Done (eg: 1)' id=
                              {`candidate_profile`}
                              placeholder={!!candidateInfo.candidate_round_completed ? candidateInfo?.candidate_round_completed : ''}
                              required={false}
                              type='text'
                              error={!!candidateInfo.candidate_round_completed && candidateInfo?.candidate_round_completed != '' && !isValidNumber(candidateInfo?.candidate_round_completed)}
                              moveLabel={candidateInfo?.candidate_round_completed != ''}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'candidate_round_completed')}
                            />

                            <div className='flex flex-row justify-between pt-4 gap-4'>
                              <p className='text-[16px] leading-tight font-semibold self-center'>
                                Status
                                { }
                              </p>
                              <CustomSelect
                                id={`candidate_status_choose`}
                                value={candidateInfo.candidate_status}
                                options={[
                                  ...(candidateInfo.candidate_status === null
                                    ? [{ value: 'null', text: 'null' }]
                                    : []),
                                  { value: 'yet_to_share', text: 'Yet To Share' },
                                  { value: 'joined', text: 'Joined' },
                                  { value: 'negotiation', text: 'Negotiation' },
                                  { value: 'on_hold', text: 'On Hold' },
                                  { value: 'feedback_pending', text: 'Feedback Pending' },
                                  { value: 'dropped_out', text: 'Dropped Out' },
                                  { value: 'rejected', text: 'Rejected' },
                                  { value: 'in_process', text: 'In Process' }
                                ]}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value as CandidateTrackingStatus, 'candidate_status')}
                                required
                              />
                            </div>
                          </>
                        }
                      </>
                  }

                  {showCompany ?
                    <>
                      <div className='flex flex-row justify-between pt-4 gap-4'>
                        <p className='text-[16px] leading-tight font-semibold self-center'>
                          Choose Company
                          { }
                        </p>
                        <EditCustomSelectCompany
                          id={`candidate_company_choose`}
                          value={companiesData.filter(prev => prev.company_id === candidateInfo.company_id)[0]?.company_name}
                          options={companiesData}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(parseInt(e.target.value), 'company_id')}
                          required
                        />
                      </div>

                      {candidateInfo.company_id &&
                        <>
                          <div className={`flex flex-row justify-between ${rolesData.length === 0 ? '' : 'pt-4'} gap-4`}>
                            <p className='text-[16px] leading-tight font-semibold self-center'>
                              Choose Role
                              { }
                            </p>
                            {rolesData.length > 0 ?
                              <EditCustomSelectRole
                                id={`candidate_role_choose`}
                                value={rolesData.filter(prev => prev.role_id === candidateInfo.role_id)[0]?.role_name}
                                options={rolesData}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(parseInt(e.target.value), 'role_id')}
                                required
                              />
                              :
                              <div className="flex flex-wrap pt-6">
                                <div role="status" className="max-w-screen-xl animate-pulse">
                                  <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                                  <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                                </div>
                              </div>
                            }
                          </div>
                        </>
                      }
                    </> :
                    <div>
                      <div>
                        <div className='flex flex-row justify-between pt-4 gap-4'>
                          <p className='text-[16px] leading-tight font-semibold self-center'>
                            Add Candidate to Company ?
                          </p>
                          <CustomSelect
                            id={`candidate_status_choose`}
                            value={addCompany ? 'true' : 'false'}
                            options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setAddCompany(prev => !prev)}
                            required
                          />
                        </div>
                      </div>
                      {addCompany &&
                        <>
                          <div className='flex flex-row justify-between pt-4 gap-4'>
                            <p className='text-[16px] leading-tight font-semibold self-center'>
                              Choose Company
                              { }
                            </p>
                            <EditCustomSelectCompany
                              id={`candidate_company_choose`}
                              value={companiesData.filter(prev => prev.company_id === candidateInfo.company_id)[0]?.company_name}
                              options={companiesData}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(parseInt(e.target.value), 'company_id')}
                              required
                            />
                          </div>

                          {candidateInfo.company_id &&
                            <>
                              <div className={`flex flex-row justify-between ${rolesData.length === 0 ? '' : 'pt-4'} gap-4`}>
                                <p className='text-[16px] leading-tight font-semibold self-center'>
                                  Choose Role
                                  { }
                                </p>
                                {rolesData.length > 0 ?
                                  <EditCustomSelectRole
                                    id={`candidate_role_choose`}
                                    value={rolesData.filter(prev => prev.role_id === candidateInfo.role_id)[0]?.role_name}
                                    options={rolesData}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(parseInt(e.target.value), 'role_id')}
                                    required
                                  />
                                  :
                                  <div className="flex flex-wrap pt-6">
                                    <div role="status" className="max-w-screen-xl animate-pulse">
                                      <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                                      <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                                    </div>
                                  </div>
                                }
                              </div>
                            </>
                          }
                        </>
                      }
                    </div>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>

      </div >
    }
    <button
      onClick={handleSubmit}
      className={`${error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
      disabled={error}
    >
      Submit
    </button>
  </div >
}

export default EditCandidate