"use client";

import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';

import Loading from '../Components/Loading';
import RenderQuotients from './Components/RenderQuotients';

const AllQuotients = () => {

  const [loading, setLoading] = useState(true);

  const [quotientWeightageFactors, setQuotientWeightageFactors] = useState([]);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/quotients-all', {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setQuotientWeightageFactors(data.data);
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
    getData();
  }, []);

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
                {responseDetails || quotientWeightageFactors.length === 0 ?
                  <>
                    {responseDetails}
                    <div className='overflow-x-auto bg-white p-2'>
                      Add Quotient? <Link href={'/quotients/addQuotient'} className='underline text-blue-500'>Click here</Link>
                    </div>
                  </>
                  :
                  <RenderQuotients quotients={quotientWeightageFactors} />
                }
              </>
          }
        </div>
      </section >
    </>
  )
}

export default AllQuotients