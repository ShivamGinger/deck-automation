"use client";

import Loading from '@/app/(site)/Components/Loading';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import { getCompanyName } from '@/utils/helperFunctions';
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

  const [loading, setLoading] = useState(true);

  const [candidateUnderRole, setCandidateUnderRole] = useState<[]>();

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          
          setCandidateUnderRole(data.data);
        } else {
          const data = await response.json();
          setResponseDetails(data.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [companyID, roleID]);

  return (
    <section className='mt-12'>
      <section className='mt-12'>
        <div className='max-w-screen-2xl mx-auto flex flex-col'>
          {
            loading ?
              <Loading /> :
              <>
                {responseDetails ?
                  <>
                    {responseDetails}
                    <div className='overflow-x-auto bg-white p-2'>
                      Add Candidates? <Link href={`/deck-automation/${companyID}/${roleID}/addCandidate`} className='underline text-blue-500'>Click here</Link>
                    </div>
                  </>
                  :
                  <RenderCandidateUnderRoles candidatesUnderRole={candidateUnderRole} />
                }
              </>
          }
        </div>
      </section>
    </section>
  )
}

export default Company