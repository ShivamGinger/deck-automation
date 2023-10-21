'use client';

import React from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import './style.css';

const Page = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');

  return (
    <>
      <div className="flex h-screen w-screen" id="html-to-convert">
        <div className="flex ">
          <div className="flex flex-col  pt-6 px-8">
            <div className="">
              GP logo
            </div>
            <div className="cadidate info flex flex-col gap-y-2 border-b border-black py-4">
              <Image width={44} height={44} src={'https://demo-images-bucket-stream-helper.s3.ap-south-1.amazonaws.com/2db1dec435f61a90ff7411696d648abe'} alt="profile pic" className="rounded-xl " />
              <p className="font-bold text-lg " id="name">
                {name}
              </p>
              <p className="font-bold text-lg " id="role">
                Head AI Researcher
              </p>
            </div>
            <p className="py-6 w-44 break-words border-b border-black" id="description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, esse.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, esse.
            </p>
            <div className="flex flex-col py-4 gap-y-3 border-b border-black">
              <p className="uppercase font-semibold text-lg" id="personal-details">personal details</p>
              <div>
                Male
              </div>
              <div>
                7+ years
              </div>
              <div>
                INR 70 LPA
              </div>
            </div>
            <div className="flex flex-col py-4 gap-y-3">
              <p className="uppercase font-semibold text-lg" id="personal-details">contact info</p>
              <div>
                69
              </div>
              <div>
                email
              </div>
              <div>
                Linkedin profile
              </div>
            </div>
          </div>
          <div className="border-r-2 border-black"></div>
          <div className="flex flex-col pl-12 pt-6 pr-8 " id="details-right-bg">
            <div className="flex flex-row gap-x-8 font-bold text-2xl pb-6" id="candidate-role">
              <h2>Candidate-1</h2>
              <h2>Minus Zero- Role</h2>
            </div>
            <div className="pb-6">
              <div id="gp-score" className="bg-white p-4 text-2xl font-semibold rounded-xl w-44 ">
                GP Score- 4.3
              </div>
            </div>
            <div className="flex flex-wrap gap-10" id="detail-right">
              <div className="bg-white p-16 rounded-xl " id="key-points">
                <div className="flex flex-col">
                  <div className="font-bold uppercase pb-3" id="details-heading">key points</div>
                  <div className="pl-8">
                    <ul className="list-disc text-sm">
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, tempora!</li>
                      <li>hehe</li>
                      <li>hehe</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white p-16 rounded-xl" id="experience-achivements">
                <div className="flex flex-col">
                  <div className="font-bold uppercase pb-3" id="details-heading">experience and achivements</div>
                  <div className="pl-8">
                    <ul className="list-disc text-sm">
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, tempora!</li>
                      <li>hehe</li>
                      <li>hehe</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white p-16 rounded-xl " id="gp-quotient">
                <div className="flex flex-col">
                  <div className="font-bold uppercase pb-3" id="details-heading">gp quotient</div>
                  <div className="pl-8">
                    <ul className="list-disc text-sm">
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, tempora!</li>
                      <li>hehe</li>
                      <li>hehe</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white p-16 rounded-xl" id="top-attributes">
                <div className="flex flex-col">
                  <div className="font-bold uppercase pb-3" id="details-heading">top 5 attributes</div>
                  <div className="pl-8">
                    <ul className="list-disc text-sm">
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, tempora!</li>
                      <li>hehe</li>
                      <li>hehe</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 " id="notes">
              <p className="italic text-lg">Note(s)- IQ- Intelligence Quotiend; EQ- Emotional Quotient; SQ- Social Quotient; AQ-
                Adversity Quotient</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page