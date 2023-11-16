"use client";

import { CandidateInformation } from '@/utils/constants';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '../Components/Loading';
import AllCandidateListing from './Components/AllCandidateListing';
import Status from './Components/Status';

const status = [
  'yet_to_share',
  'joined',
  'negotiation',
  'in_process',
  'on_hold',
  'feedback_pending',
  'dropped_out',
  'rejected'
]

const CandidateListing = () => {
  const [candidates, setCandidates] = useState([]);

  const [loading, setLoading] = useState(true);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/candidates?status=true`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();
          // name: "mai hu"
          // email: "huhula@gmail.com"
          // phNum: "1438232472"
          // gender: null
          // currPos: null
          // currCmp: null
          // currLoc: null
          // experience: null
          // fixedLpa: null
          // varLpa: null
          // expectedCtc: null
          // esopRsu: null
          // noticePeriod: null
          // social: null
          // description: null

          // keyPoints: null
          // profilePic: null
          // achievement: null

          // company: null
          // companyId: null
          // createdAt: "2023-11-10 21:52:15"
          // id: 1
          // role: null
          // roleId: null
          console.log(data.data);
          setCandidates(data.data);
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
                  <AllCandidateListing
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