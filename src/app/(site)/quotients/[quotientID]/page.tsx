'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';

import { ParameterFactors } from '@/utils/types';
import { useSession } from 'next-auth/react';
import Loading from '../../Components/Loading';
import RenderParameters from './Components/RenderParameters';

const RenderParameter = () => {
  const { quotientID } = useParams();

  const [parameters, setParameters] = useState<ParameterFactors[]>([]);

  const [quotientName, setQuotientName] = useState('');

  const [loading, setLoading] = useState(true);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/quotients-all/${quotientID}/qparam-all`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setParameters(data.data);
          setQuotientName(data.data[0].quotient_name);
        } else {
          const data = await response.json();
          setResponseDetails(data.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      if (session.user.can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    };
  }, [quotientID, router, session?.user]);

  return (
    <>
      <section className='mt-12'>
        <div className='max-w-screen-2xl mx-auto flex flex-col'>
          {
            loading ?
              <>
                <Loading />
              </> :
              <>
                {responseDetails || parameters.length == 0 ?
                  <>
                    {responseDetails}
                    {
                      session?.user.can_create && session.user.can_read &&
                      <div className='overflow-x-auto bg-white p-2'>
                        Add Parameter? <Link href={`/quotients/${quotientID}/addParameter`} className='underline text-blue-500' prefetch={false}>Click here</Link>
                      </div>
                    }
                  </>
                  :
                  <RenderParameters
                    parameters={parameters}
                    quotientName={quotientName}
                  />
                }
              </>
          }
        </div>
      </section>
    </>
  )
}

export default RenderParameter