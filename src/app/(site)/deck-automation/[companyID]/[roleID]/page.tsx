"use client";

import { ITEMS_PER_PAGE } from '@/utils/constants';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import RenderCandidateUnderRoles from './Components/RenderCandidateUnderRoles';

const userUnderAdmin = [
  {
    Candidate_Name: "XYZ",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: ""
  },
  {
    Candidate_Name: "XYZ",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: ""
  },
];

const candidates = [
  {
    id: 1,
    name: 'candidate 1',
    email: '1@gmail.cpom,',
    GPscore: 4.3,
    Experience: 3,
    ctc: 1
  },
  {
    id: 1,
    name: 'camdodate 2',
    email: '2@gmail.com',
    GPscore: 4.3,
    Experience: 3,
    ctc: 1
  },
]

const Company = () => {
  const { roleID, companyID } = useParams();

  const [candidateUnderRole, setCandidateUnderRole] = useState<[]>();

  useLayoutEffect(() => {
    const getData = async () => {

    }
    getData();
  }, [companyID]);


  return (
    <section className='mt-12'>
      <section className='mt-12'>
        <div className='max-w-screen-2xl mx-auto flex flex-col'>
          {candidateUnderRole?.length === 0 || !candidateUnderRole ?
            <>
              <div className='overflow-x-auto bg-white p-2'>
                Add Candidates? <Link href={`/deck-automation/${companyID}/${roleID}/addCandidate`} className='underline text-blue-500'>Click here</Link>
              </div>
            </>
            :
            <RenderCandidateUnderRoles candidatesUnderRole={[]} />
          }

          <RenderCandidateUnderRoles candidatesUnderRole={candidates} />

        </div>
      </section>
    </section>
  )
}

export default Company