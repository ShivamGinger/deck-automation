'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AddCandidate from './Components/AddCandidate';

const AddCandidateTracking = () => {
  const router = useRouter();

  return <>
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/candidate-tracking/`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Add Candidate</h1>

          <div className="space-y-12 flex flex-col">
            <AddCandidate />

          </div>

        </div>
      </div>
    </section>
  </>
}

export default AddCandidateTracking