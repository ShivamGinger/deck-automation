"use client";

import React, { useLayoutEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';


import Loading from '@/app/(site)/Components/Loading';
import { CompleteCandidateInformation, QuotientFactorsWeightage } from '@/utils/types';
import Link from 'next/link';
import CanAddCandidate from './Components/CanAddCandidate';
import RenderCandidatesUnderRole from './Components/RenderCandidatesUnderRole';

const DisplayCandidatesUnderRoles = () => {
  const { roleID, companyID } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [quotientsDetailsUnderRole, setQuotientsDetailsUnderRole] = useState<QuotientFactorsWeightage[]>([]);

  const [candidateDetailsUnderRole, setCandidateDetailsUnderRole] = useState<{
    candidate_id: number,
    profile_pic: string,
    candidate_name: string,
    role_name: string,
    gp_score: string,
    description: string,
  }[]>([]);

  const [roleName, setRoleName] = useState('');

  const [companyName, setCompanyName] = useState('');

  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  useLayoutEffect(() => {
    const getQuotientsDetails = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length === 0) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/addQuotients`);

          } else {
            setQuotientsDetailsUnderRole(data.data);
            setRoleName(data.data[0].role_name);
            setCompanyName(data.data[0].company_name);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getQuotientsDetails();
  }, [companyID, roleID, router]);

  useLayoutEffect(() => {
    const getCandidateDetails = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/role_candidates`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setCandidateDetailsUnderRole(data.data);
        } else {
          const data = await response.json();
          setErrorDetails(data.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getCandidateDetails();
  }, [companyID, roleID, router]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <Loading /> :
            <>
              {errorDeatils &&
                <>
                  <div className='bg-white p-2'>
                    <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}`)}>
                      {'<'}
                    </div>
                    {errorDeatils}

                    <CanAddCandidate
                      quotientsDetailsUnderRole={quotientsDetailsUnderRole}
                    />

                    <div className='p-4 pt-0'>
                      View Quotients? <Link href={`/deck-automation/${companyID}/${roleID}/quotients`} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
                    </div>
                  </div>
                </>
              }
              {
                candidateDetailsUnderRole.length !== 0 &&
                <RenderCandidatesUnderRole
                  roleName={roleName}
                  companyName={companyName}
                  candidateDetailsUnderRole={candidateDetailsUnderRole}
                />
              }
            </>
        }
      </div>
    </section>
  )
}

export default DisplayCandidatesUnderRoles