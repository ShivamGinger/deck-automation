'use client';

import React from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import '../html2pdf/style.css';
import SingleCandidate from './Components/SingleCandidateData';

const Page = () => {
  const searchParams = useSearchParams();

  const listIndividualCandidateDataString = searchParams.get('listIndividualCandidateData');
  let listIndividualCandidateData: {
    candidateName: string,
    profilePic: string,
    keyPointsString: string,
    social: string,
    email: string,
    gpScore: string,
    achivementsString: string,
    description: string,
    gender: string,
    experience: string,
    fixedLpa: string,
    phoneNumber: string,
    top5AttributesString: string,
    quotientScoresString: string,
  }[] = [];
  if (listIndividualCandidateDataString) {
    listIndividualCandidateData = JSON.parse(decodeURIComponent(listIndividualCandidateDataString));
  }

  const companyName = searchParams.get('companyName');

  const roleName = searchParams.get('roleName');

  return (
    <>
      <div className='flex h-screen flex-col bg-[#FEFAEF] pt-12 '>
        <div className='flex pl-8 gap-44 items-center'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h2 className='font-bold uppercase text-2xl text-[#542C06]'>Executive Summary- {companyName}</h2>
        </div>
        <div className='px-24 py-12 '>
          <div className='bg-white rounded-lg custom-box-shadow'>
            <table className="w-full border-separate border-spacing-4 px-6 pt-2">
              <thead className="">
                <tr className='gap-x-4'>
                  <th className="table-headings">S.No.</th>
                  <th className="table-headings">Candidate</th>
                  <th className="table-headings">Candidate Name</th>
                  <th className="table-headings">Role</th>
                  <th className="table-headings">GP Score</th>
                  <th className="table-headings">Key Observations</th>
                </tr>
              </thead>
              <tbody className="">
                {listIndividualCandidateData?.map((detail, index) => (
                  <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      {index + 1}
                    </td>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      <>
                        {detail.profilePic ?
                          <div className='flex justify-center'>
                            <Image
                              src={detail.profilePic}
                              width={150}
                              height={0}
                              priority
                              // style={{ width: '150px' }}
                              className="rounded-md h-32"
                              alt={`Profile Pic for ${detail.candidateName}`}
                              sizes="(max-width: 600px) 100vw, 600px"
                            />
                          </div>
                          :
                          <>
                            No Profile Pic for {detail.candidateName}
                          </>
                        }
                      </>
                    </td>

                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      {detail.candidateName}
                    </td>

                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      {roleName}
                    </td>

                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      {parseFloat(detail.gpScore).toFixed(2)}
                    </td>

                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      {detail.description}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {listIndividualCandidateData.map((data, index) => (
        <SingleCandidate
          key={index}
          name={data.candidateName}
          profilePic={data.profilePic}
          keyPointsString={data.keyPointsString}
          social={data.social}
          companyName={companyName ? companyName : ''}
          roleName={roleName ? roleName : ''}
          email={data.email}
          gpScore={data.gpScore}
          achivementsString={data.achivementsString}
          description={data.description}
          gender={data.gender}
          experience={data.experience}
          fixedLpa={data.fixedLpa}
          phoneNumber={data.phoneNumber}
          top5AttributesString={data.top5AttributesString}
          quotientScoresString={data.quotientScoresString}
        />
      ))}
    </>
  )
}

export default Page