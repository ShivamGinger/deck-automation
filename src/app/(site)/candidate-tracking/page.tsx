"use client";

import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';

import { CompleteCandidateInformation } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '../Components/Loading';
import NoCandidateComponent from './Components/NoCandidateComponent';
import RenderCandidatesForTracking from './Components/RenderCandidatesForTracking';

const CandidateListing = () => {
  const [candidates, setCandidates] = useState<CompleteCandidateInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [responseDetails, setResponseDetails] = useState<string | null>(null);
  const [specialQueryError, setspecialQueryError] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const router = useRouter();

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      setCandidates([]);
      setLoading(true);
      setspecialQueryError(false);

      try {
        const response = await fetch(`/api/candidates?query=${query}`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setCandidates(data.data);
        } else {
          const data = await response.json();

          if (data.specialQueryError) {
            setspecialQueryError(true);
          } else {
            setResponseDetails(data.error);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      if (session.user.candidate_tracking_can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    };
  }, [router, session?.user, query]);

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
                {responseDetails ?
                  <>
                    {responseDetails}
                    {
                      session?.user.candidate_tracking_can_create &&
                      <div className='overflow-x-auto bg-white p-2'>
                        Add Candidate? <Link href={`/candidate-tracking/addCandidate`} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
                      </div>
                    }
                  </>
                  :
                  <>
                    {
                      specialQueryError ?
                        <NoCandidateComponent />
                        :
                        <RenderCandidatesForTracking
                          candidates={candidates}
                        />
                    }
                  </>
                }
              </>
          }
        </div>
      </section>
    </>
  )
}

export default CandidateListing