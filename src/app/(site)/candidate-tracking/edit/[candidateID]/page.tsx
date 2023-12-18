'use client';

import React, { useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { EditCandidateTrackingInformation } from '@/utils/types';
import { useSession } from 'next-auth/react';
import EditCandidate from './Components/EditCandidate';

const EditCandidateTracking = () => {
  const router = useRouter();

  const { candidateID } = useParams();

  const [candidateInfo, setCandidateInfo] = useState<EditCandidateTrackingInformation>()

  const [responseDetails, setResponseDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/candidates/${candidateID}`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setCandidateInfo(data.data[0]);

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

    if (session?.user) {
      if (session.user.candidate_tracking_can_edit) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    };
  }, [candidateID, router, session?.user]);

  return <>
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/candidate-tracking?query=`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="ginger-partners-logo" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Edit Candidate</h1>

          {responseDetails}

          <div className="space-y-12 flex flex-col">
            {candidateInfo && !loading ?
              <EditCandidate
                candidates={candidateInfo}
              />
              :
              <Loading />
            }
          </div>

        </div>
      </div>
    </section>
  </>
}

export default EditCandidateTracking