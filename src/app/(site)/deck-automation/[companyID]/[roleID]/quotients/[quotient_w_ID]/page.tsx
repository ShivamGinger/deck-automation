"use client";

import React, { useLayoutEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { ParametersQuotientFactors } from '@/utils/types';
import RenderParametersUnderQuotient from './Components/RenderParametersUnderQuotients';

const DisplayParametersUnderQuotients = () => {
  const { roleID, companyID, quotient_w_ID } = useParams();

  const searchParams = useSearchParams();

  const quotientID = searchParams.get('qid');

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [parametersUnderQuotients, setParameterUnderQuotient] = useState<ParametersQuotientFactors[]>([]);

  const [quotientName, setQuotientName] = useState('');

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients/${quotient_w_ID}/parameters`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length === 0) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/${quotient_w_ID}/parameter?qid=${quotientID}`);

          } else {
            setParameterUnderQuotient(data.data);
            setQuotientName(data.data[0].quotient_name);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [companyID, roleID, router, quotient_w_ID, quotientID]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading || parametersUnderQuotients.length === 0 ?
            <Loading /> :
            <>
              {
                <RenderParametersUnderQuotient
                  quotientName={quotientName}
                  parametersUnderQuotients={parametersUnderQuotients}
                />
              }
            </>
        }
      </div>
    </section>
  )
}

export default DisplayParametersUnderQuotients