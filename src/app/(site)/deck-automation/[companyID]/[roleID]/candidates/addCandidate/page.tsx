"use client";

import React, { useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { ParametersQuotientFactorsValue, QuotientFactorsWeightage } from '@/utils/types';
import AddCandidate from './Components/AddCandidate';

const CheckAddCandidate = () => {
  const { roleID, companyID } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [quotientsDetailsUnderRole, setQuotientsDetailsUnderRole] = useState<QuotientFactorsWeightage[]>([]);

  const [parametersUnderQuotients, setParameterUnderQuotient] = useState<ParametersQuotientFactorsValue[]>([]);

  useLayoutEffect(() => {
    const getQuotientsDetails = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
          method: 'GET'
        });
        if (response.ok) {
          const data = await response.json();

          if (data.data.length === 0) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/addQuotients`);

          } else {
            setQuotientsDetailsUnderRole(data.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getQuotientsDetails();

  }, [companyID, roleID, router]);

  useEffect(() => {
    const makeAPICalls = async () => {
      let parametersData: ParametersQuotientFactorsValue[] = [];

      for (const quotient of quotientsDetailsUnderRole) {
        try {

          const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients/${quotient.quotient_weightage_id}/parameters`, {
            method: 'GET'
          });

          if (response.ok) {
            const data = await response.json();

            if (data.data.length === 0) {
              router.replace(`/deck-automation/${companyID}/${roleID}/candidates`);
            } else {
              const modifiedData = data.data.map((param: QuotientFactorsWeightage) => ({
                ...param,
                parameter_score: 1
              }));

              parametersData = [...parametersData, ...modifiedData];
            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      setParameterUnderQuotient(parametersData);
    };

    if (quotientsDetailsUnderRole.length > 0) {
      makeAPICalls();
      setLoading(false);
    }
  }, [quotientsDetailsUnderRole, companyID, roleID, router])

  return (
    <>
      {loading ?
        <section className='mt-12'>
          <div className='max-w-screen-2xl mx-auto flex flex-col'>
            <Loading />
          </div>
        </section> :
        <section className='bg-[#FEFAEF] '>
          <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
            <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}/${roleID}/candidates`)}>
              {'<'}
            </div>
            <div className='flex justify-center py-12 flex-col items-center gap-12'>
              <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />

              <div>
                <AddCandidate
                  quotientsDetailsUnderRole={quotientsDetailsUnderRole}
                  parametersUnderQuotients={parametersUnderQuotients}
                />
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default CheckAddCandidate