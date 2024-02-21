'use client';

import React from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';
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
    currentPosition: string,
    currentCompany: string,
    currentLocation: string,
    variableCtc: string,
    esopRsu: string,
    expectedCtc: string,
    noticePeriod: string,
  }[] = [];
  if (listIndividualCandidateDataString) {
    listIndividualCandidateData = JSON.parse(decodeURIComponent(listIndividualCandidateDataString));
  }

  const companyName = searchParams.get('companyName');

  const roleName = searchParams.get('roleName');

  const companyLogo = searchParams.get('companyLogo');

  return (
    <>
      <div className='flex h-screen flex-col bg-[#FEFAEF]'>
        <div className='flex justify-between px-6 bg-white rounded-md py-4 shadow-md'>
          <div className='flex flex-row items-center gap-12'>
            {companyLogo ?
              <Image width={150} height={150} src={companyLogo} alt="profile pic" className="rounded-xl " priority />
              :
              companyName
            }
            <h2 className='font-bold capitalize text-xl text-[#542C06]'>Executive Summary- Candidates for {companyName}- {roleName}</h2>
          </div>
          <div className='flex pl-8 gap-44 items-center'>
            <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          </div>

        </div>
        <div className='px-6 py-12 '>
          <div className='border '>
            <table className="w-full px-6 pt-2">
              <thead className="border border-[#542C06]">
                <tr className='bg-[#F7CCA5] border border-[#542C06]'>
                  <th className="p-3 border border-[#542C06]">S.No.</th>
                  <th className="p-3 border border-[#542C06]">Candidate Name</th>
                  <th className="p-3 border border-[#542C06]">Current Position</th>
                  <th className="p-3 border border-[#542C06]">Current Company</th>
                  <th className="p-3 border border-[#542C06]">GP Score (out of 5)</th>
                  <th className="p-3 border border-[#542C06]">Current Location</th>
                  <th className="p-3 border border-[#542C06]">Years of Experience</th>
                  <th className="p-3 border border-[#542C06]">Phone Number</th>
                  <th className="p-3 border border-[#542C06]">Linkedin</th>
                  <th className="p-3 border border-[#542C06]">Fixed CTC in LPA</th>
                  <th className="p-3 border border-[#542C06]">Variable CTC in LPA</th>
                  <th className="p-3 border border-[#542C06]">ESOPS/RSU Per Year LPA</th>
                  <th className="p-3 border border-[#542C06]">Expected CTC (LPA)</th>
                  <th className="p-3 border border-[#542C06]">Notice Period (Days)</th>
                </tr>
              </thead>
              <tbody className="">
                {listIndividualCandidateData?.sort((a, b) => parseFloat(b.gpScore) - parseFloat(a.gpScore)).map((detail, index) => (
                  <tr key={index}>
                    <td className={`table-row-data`}>
                      {index + 1}
                    </td>
                    <td className={`table-row-data underline cursor-pointer`}
                      onClick={() => document.querySelector(`#candidate-${detail.phoneNumber}`)?.scrollIntoView()}
                    >
                      {detail.candidateName}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.currentPosition}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.currentCompany}
                    </td>
                    <td className={`table-row-data`}>
                      {parseFloat(detail.gpScore).toFixed(1)}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.currentLocation}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.experience}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.phoneNumber}
                    </td>
                    <td className={`table-row-data underline`}>
                      <a href={`http://${detail.social}`} target='_blank' rel='noopener noreferrer' className='underline cursor-pointer'>Linkedin</a>
                    </td>
                    <td className={`table-row-data`}>
                      {detail.fixedLpa}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.variableCtc}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.esopRsu}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.expectedCtc}
                    </td>
                    <td className={`table-row-data`}>
                      {detail.noticePeriod}
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