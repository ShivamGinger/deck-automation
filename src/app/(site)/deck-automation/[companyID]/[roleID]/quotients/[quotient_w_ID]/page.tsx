"use client";

import React, { useLayoutEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { ParametersQuotientFactors } from '@/utils/types';
import { useSession } from 'next-auth/react';
import RenderParametersUnderQuotient from './Components/RenderParametersUnderQuotients';

const DisplayParametersUnderQuotients = () => {
  const { roleID, companyID, quotient_w_ID } = useParams();

  const searchParams = useSearchParams();

  const quotientID = searchParams.get('qid');

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [parametersUnderQuotients, setParameterUnderQuotient] = useState<ParametersQuotientFactors[]>([]);

  const [quotientName, setQuotientName] = useState('');

  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients/${quotient_w_ID}/parameters`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length === 0 && session?.user.all_quotients_can_create) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/${quotient_w_ID}/parameter?qid=${quotientID}`);

          } else if (data.data.length > 0) {
            setParameterUnderQuotient(data.data);
            setQuotientName(data.data[0].quotient_name);
          } else {
            setErrorDetails('No paramters under this quotient');

          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      if (session.user.all_quotients_can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    };
  }, [companyID, roleID, router, quotient_w_ID, quotientID, session?.user]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <Loading /> :
            <>
              {errorDeatils &&
                <>
                  <div className='bg-white p-2'>
                    <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}/${roleID}/quotients`)}>
                      {'<'}
                    </div>
                    {errorDeatils}
                  </div>
                </>
              }
              {
                parametersUnderQuotients.length !== 0 &&
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