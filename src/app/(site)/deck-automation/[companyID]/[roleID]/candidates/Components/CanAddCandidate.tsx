"use client";

import React, { useLayoutEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { QuotientFactorsWeightage } from '@/utils/types';

const CanAddCandidate = ({
  quotientsDetailsUnderRole
}: {
  quotientsDetailsUnderRole: QuotientFactorsWeightage[],
}) => {
  const { roleID, companyID } = useParams();

  const [isErrorOccurred, setIsErrorOccurred] = useState(false);

  const [showErrorPopUp, setShowErrorPopUp] = useState(false);

  useLayoutEffect(() => {
    const makeAPICalls = async () => {
      for (const item of quotientsDetailsUnderRole) {
        if (isErrorOccurred) {
          break;
        }

        try {
          const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients/${item.quotient_weightage_id}/parameters`, {
            method: 'GET'
          });

          if (response.ok) {
            const data = await response.json();

            if (data.data.length === 0) {
              setIsErrorOccurred(true);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    makeAPICalls();
  }, [companyID, roleID, quotientsDetailsUnderRole, isErrorOccurred]);

  return (
    <>
      {isErrorOccurred ?
        <div className='p-4 cursor-not-allowed relative w-60' onMouseEnter={() => setShowErrorPopUp(true)} onMouseLeave={() => setShowErrorPopUp(false)}>
          <span className='opacity-50 '>
            Add Candidates?{' '}
            <span className='underline text-blue-500'>Click here</span>
          </span>
          <div
            className='absolute left-0 bg-white p-2 pt-0 rounded shadow-md opacity-100 border border-black'
            style={{ display: showErrorPopUp ? 'block' : 'none' }}
          >
            <span>Can&apos;t add candidates, parameter weightages missing for quotients!</span>
          </div>
        </div>
        :
        <div className='p-4'>
          Add Candidates? <Link href={`/deck-automation/${companyID}/${roleID}/candidates/addCandidate`} className='underline text-blue-500'>Click here</Link>
        </div>
      }
    </>
  )
}

export default CanAddCandidate