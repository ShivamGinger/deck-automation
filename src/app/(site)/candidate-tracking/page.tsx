"use client";

import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';

import { CompleteCandidateInformation } from '@/utils/types';
import Loading from '../Components/Loading';
import RenderCandidatesForTracking from './Components/RenderCandidatesForTracking';

const CandidateListing = () => {
  const [candidates, setCandidates] = useState<CompleteCandidateInformation[]>([]);

  const [loading, setLoading] = useState(true);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/candidates`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setCandidates(data.data.sort((a: CompleteCandidateInformation, b: CompleteCandidateInformation) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            return dateA - dateB;
          }));
        } else {
          const data = await response.json();
          setResponseDetails(data.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <section className='mt-12'>
        <div className='max-w-screen-2xl mx-auto flex flex-col'>
          {
            loading ?
              <>
                <Loading />
              </> :
              <>
                {responseDetails || candidates.length === 0 ?
                  <>
                    {responseDetails}
                    <div className='overflow-x-auto bg-white p-2'>
                      Add Candidate? <Link href={`/candidate-tracking/addCandidate`} className='underline text-blue-500'>Click here</Link>
                    </div>
                  </>
                  :
                  <RenderCandidatesForTracking
                    candidates={candidates}
                  />
                }
              </>
          }
        </div>
      </section>
    </>
  )
}

export default CandidateListing