'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import '../../html2pdf/style.css';

type Attribute = {
  id: number;
  title: string;
  value: number;
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

function GaugeChart({ value }: { value: number }) {
  const data = {
    datasets: [
      {
        data: [value, 5 - value],
        backgroundColor: ['rgba(176, 101, 0, 1)', 'rgba(217, 187, 147, 1)'],
        borderColor: ['rgba(176, 101, 0, 1)', 'rgba(217, 187, 147, 1)'],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    cutout: '80%',
  };

  return <div className='absolute custom-class -top-2'>
    <Doughnut data={data} options={options} />
  </div>;
}

const SingleCandidate = ({
  name,
  profilePic,
  keyPointsString,
  social,
  companyName,
  roleName,
  email,
  gpScore,
  achivementsString,
  description,
  gender,
  experience,
  fixedLpa,
  phoneNumber,
  top5AttributesString,
  quotientScoresString
}: {
  name: string,
  profilePic: string,
  keyPointsString: string
  social: string,
  companyName: string,
  roleName: string,
  email: string,
  gpScore: string,
  achivementsString: string,
  description: string,
  gender: string,
  experience: string,
  fixedLpa: string,
  phoneNumber: string,
  top5AttributesString: string,
  quotientScoresString: string
}) => {

  let keyPoints = [''];
  if (keyPointsString) {
    keyPoints = JSON.parse(keyPointsString);
  };

  let achivements = [''];
  if (achivementsString) {
    achivements = JSON.parse(achivementsString);
  };

  let top5Attributes: Attribute[] | undefined;
  if (top5AttributesString) {
    top5Attributes = JSON.parse(top5AttributesString);
  };

  let quotientScores: Attribute[] | undefined;
  if (quotientScoresString) {
    quotientScores = JSON.parse(quotientScoresString);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col z-20 bg-white pt-12 px-8 ">
          <div className="">
            <Image width={120} height={120} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          </div>

          <div className="cadidate info flex flex-col gap-y-2  py-4 ">
            {profilePic ?
              <Image
                src={profilePic}
                width={0}
                height={0}
                priority
                className="object-cover rounded-md h-32"
                style={{ width: "100%" }}
                alt={`Profile Pic for ${name}`}
                sizes="(max-width: 600px) 100vw, 600px"
              /> :
              <>
                No Profile Pic for {name}
              </>
            }
            <p className="font-bold text-lg " id="name">
              {name}
            </p>
            <p className="font-bold text-lg " id="role">
              {roleName}
            </p>
          </div>

          <div className='border-b border-black'></div>

          <p className="py-6 w-44 font-medium break-words " id="description">
            {description}
          </p>

          <div className='border-b border-black'></div>

          <div className="flex flex-col py-6 gap-y-3 ">
            <p className="uppercase font-semibold text-lg" id="personal-details">personal details</p>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-y-4 justify-center'>
                {gender === 'male' &&
                  <Image width={25} height={25} src={'/images/gender.png'} alt="male" />
                }
                {gender === 'female' &&
                  <Image width={25} height={25} src={'/images/female.png'} alt="male" />
                }
                {gender === 'other' &&
                  <Image width={25} height={25} src={'/images/other genders.png'} alt="male" />
                }
                <Image width={25} height={25} src={'/images/experience.png'} alt="experience" />
                <Image width={25} height={25} src={'/images/money.png'} alt="money" />
              </div>
              <div className='flex flex-col gap-y-4 justify-center '>
                {gender === 'male' &&
                  <div>Male</div>
                }
                {gender === 'female' &&
                  <div>Female</div>
                }
                {gender === 'other' &&
                  <div>Other</div>
                }
                <div>{experience}</div>
                <div>INR {fixedLpa && parseInt(fixedLpa)} LPA</div>
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
                <div>{phoneNumber}</div>
                {email && email?.length > 18 ? <div className='text-xs'>{email}</div> : <div className=''>{email}</div>}
                {social ? <Link href={social} target='_blank' prefetch={false} rel='noopener noreferrer'>Linkedin profile</Link> : <div>Linkedin profile</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="custom-box-shadow z-10"></div>

        <div className="flex flex-col pl-12 pt-12 w-screen " id="details-right-bg">
          <div className="flex flex-row gap-x-8 font-bold text-2xl pb-6" id="candidate-role">
            <h2>{companyName}</h2>
          </div>

          <div className="pb-6">
            <div id="gp-score" className="bg-[#542C06] text-white p-4 text-3xl font-bold rounded-2xl w-60 flex justify-center">
              <span>
                GP Score- {gpScore && parseFloat(gpScore).toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-10" id="detail-right">
            <div className="bg-white p-8 rounded-xl " id="key-points">
              <div className="flex flex-col">
                <div className="font-bold uppercase pb-3" id="details-heading">key points</div>
                <div className="pl-12">
                  <ul className="list-disc text-sm">
                    {keyPoints.map((point, index) => (
                      <li key={index} className='text-lg'>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl" id="experience-achivements">
              <div className="flex flex-col">
                <div className="font-bold uppercase pb-3" id="details-heading">experience and achivements</div>
                <div className="pl-12">
                  <ul className="list-disc text-sm">
                    {achivements.map((point, index) => (
                      <li key={index} className='text-lg'>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl " id="gp-quotient">
              <div className="flex flex-col">
                <div className="font-bold uppercase pb-3" id="details-heading">gp quotient</div>
                <div className="justify-center flex ">
                  {quotientScores &&
                    <div className=" flex flex-col gap-8">
                      <div className='flex gap-8'>

                        {quotientScores[0] &&
                          <div className='pt-4 w-28 h-28 flex flex-col justify-center items-center rounded-lg relative' id='quotient'>
                            <GaugeChart value={quotientScores[0]?.value} />

                            <div className='p-3 font-semibold border-b border-gray-500'>
                              {quotientScores[0]?.title}
                            </div>
                            <div className='font-semibold p-2'>
                              {quotientScores[0]?.value}
                            </div>
                          </div>
                        }

                        {quotientScores[1] &&
                          <div className='pt-4 w-28 h-28 flex flex-col justify-center items-center rounded-lg relative' id='quotient'>
                            <GaugeChart value={quotientScores[1]?.value} />

                            <div className='p-3 font-semibold border-b border-gray-500'>
                              {quotientScores[1]?.title}
                            </div>
                            <div className='font-semibold p-2'>
                              {quotientScores[1]?.value}
                            </div>
                          </div>
                        }
                      </div>

                      <div className='flex gap-8'>

                        {quotientScores[2] &&
                          <div className='pt-4 w-28 h-28 flex flex-col justify-center items-center rounded-lg relative' id='quotient'>
                            <GaugeChart value={quotientScores[2]?.value} />

                            <div className='p-3 font-semibold border-b border-gray-500'>
                              {quotientScores[2]?.title}
                            </div>
                            <div className='font-semibold p-2'>
                              {quotientScores[2]?.value}
                            </div>
                          </div>
                        }

                        {quotientScores[3] &&
                          <div className='pt-4 w-28 h-28 flex flex-col justify-center items-center rounded-lg relative' id='quotient'>
                            <GaugeChart value={quotientScores[3]?.value} />

                            <div className='p-3 font-semibold border-b border-gray-500'>
                              {quotientScores[3]?.title}
                            </div>
                            <div className='font-semibold p-2'>
                              {quotientScores[3]?.value}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl" id="top-attributes">
              <div className="flex flex-col">
                <div className="font-bold uppercase pb-3" id="details-heading">top 5 attributes</div>
                <div className="pl-12 pt-4">
                  <div className="flex gap-5 ">
                    <div className='flex flex-col gap-6 items-end'>
                      {top5Attributes?.map((attribute) => (
                        <p key={attribute.id}>{attribute.title}</p>
                      ))}
                    </div>

                    <div className='border-r border-black'></div>

                    <div className=' w-1/2 gap-[2.08rem] flex flex-col'>
                      {top5Attributes?.map((attribute) => (
                        <div key={attribute.id} className='rounded-lg pt-3' style={{ width: `${(attribute.value / 5) * 100}%` }} id='top-5-attributes'></div>
                      ))}
                    </div>
                    <div className='flex flex-col gap-6 items-end'>
                      {top5Attributes?.map((attribute) => (
                        <p key={attribute.id}>{attribute.value}</p>
                      ))}
                    </div>
                  </div>
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

export default SingleCandidate