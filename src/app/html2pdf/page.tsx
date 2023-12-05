'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import SingleCandidate from '../multiplehtml2pdf/Components/SingleCandidateData';
import './style.css';

const Page = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');

  const profilePic = searchParams.get('profilePic');

  const keyPointsString = searchParams.get('keyPoints');

  const social = searchParams.get('social');

  const companyName = searchParams.get('companyName');

  const roleName = searchParams.get('roleName');

  const email = searchParams.get('email');

  const gpScore = searchParams.get('gp-score');

  const achivementsString = searchParams.get('achivements');

  const description = searchParams.get('description');

  const gender = searchParams.get('gender');

  const experience = searchParams.get('experience');

  const fixedLpa = searchParams.get('fixedLpa');

  const phoneNumber = searchParams.get('phoneNumber');

  const top5AttributesString = searchParams.get('topAttributes');

  const quotientScoresString = searchParams.get('quotientScores');

  return (
    <>
      {
        name &&
        profilePic &&
        keyPointsString &&
        social &&
        companyName &&
        roleName &&
        email &&
        gpScore &&
        achivementsString &&
        description &&
        gender &&
        experience &&
        fixedLpa &&
        phoneNumber &&
        top5AttributesString &&
        quotientScoresString &&
        <>
          <SingleCandidate
            name={name}
            profilePic={profilePic}
            keyPointsString={keyPointsString}
            social={social}
            companyName={companyName}
            roleName={roleName}
            email={email}
            gpScore={gpScore}
            achivementsString={achivementsString}
            description={description}
            gender={gender}
            experience={experience}
            fixedLpa={fixedLpa}
            phoneNumber={phoneNumber}
            top5AttributesString={top5AttributesString}
            quotientScoresString={quotientScoresString}

          />
        </>
      }
    </>
  )
}

export default Page