'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './style.css';

const Page = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col z-20 bg-white pt-12 px-8 ">
          <div className="">
            <Image width={120} height={120} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " />
          </div>

          <div className="cadidate info flex flex-col gap-y-2  py-4 ">
            <Image
              src={'https://demo-images-bucket-stream-helper.s3.ap-south-1.amazonaws.com/2db1dec435f61a90ff7411696d648abe'}
              width={0}
              height={0}
              priority
              className="object-cover rounded-md h-32"
              style={{ width: "100%" }}
              alt={`Profile Pic for ${name}`}
              sizes="(max-width: 600px) 100vw, 600px"
            />
            <p className="font-bold text-lg " id="name">
              {name}
            </p>
            <p className="font-bold text-lg " id="role">
              Head AI Researcher
            </p>
          </div>

          <div className='border-b border-black'></div>

          <p className="py-6 w-44 font-medium break-words " id="description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, esse.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, esse.
          </p>

          <div className='border-b border-black'></div>

          <div className="flex flex-col py-6 gap-y-3 ">
            <p className="uppercase font-semibold text-lg" id="personal-details">personal details</p>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-y-4 justify-center'>
                <Image width={25} height={25} src={'/images/gender.png'} alt="profile pic" />
                <Image width={25} height={25} src={'/images/experience.png'} alt="profile pic" />
                <Image width={25} height={25} src={'/images/money.png'} alt="profile pic" />
              </div>
              <div className='flex flex-col gap-y-4 justify-center '>
                <div>Male</div>
                <div>7+ years</div>
                <div>INR 70 LPA</div>
              </div>
            </div>
          </div>

          <div className='border-b border-black'></div>

          <div className="flex flex-col py-6 gap-y-3 ">
            <p className="uppercase text-lg" id="contact-info">contact info</p>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-y-4 justify-center'>
                <Image width={25} height={25} src={'/images/phone.png'} alt="profile pic" />
                <Image width={25} height={25} src={'/images/email.png'} alt="profile pic" />
                <Image width={25} height={25} src={'/images/linkedin.png'} alt="profile pic" />
              </div>
              <div className='flex flex-col gap-y-4 justify-center '>
                <div>123456789</div>
                <div className='text-xs'>sdfsfsfsjlsdjlksflksj@gmail.com</div>
                <Link href={'https://www.linkedin.com/in/shivam-taneja/'} target='_blank'>Linkedin profile</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-box-shadow z-10"></div>

        <div className="flex flex-col pl-12 pt-12 w-screen " id="details-right-bg">
          <div className="flex flex-row gap-x-8 font-bold text-2xl pb-6" id="candidate-role">
            <h2>Candidate-1</h2>
            <h2>Minus Zero- Role</h2>
          </div>
          <div className="pb-6">
            <div id="gp-score" className="bg-white p-4 text-2xl font-semibold rounded-xl w-52 ">
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
    </>
  )
}

export default Page