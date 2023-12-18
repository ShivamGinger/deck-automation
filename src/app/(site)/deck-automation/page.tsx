"use client";

import React, { useLayoutEffect, useState } from 'react';

import Link from 'next/link';

import { CompanyDetailsRoleCount } from '@/utils/types';
import Loading from '../Components/Loading';
import RenderCompanies from './Components/RenderCompanies';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Companies = () => {

  const [companies, setCompanies] = useState<CompanyDetailsRoleCount[]>([]);

  const [loading, setLoading] = useState(true);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setCompanies(data.data);
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
  }, [session?.user, router]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <>
              <Loading />
            </> :
            <>
              {responseDetails || companies.length === 0 ?
                <>
                  {responseDetails}
                  {
                    session?.user.can_create &&
                    <div className='overflow-x-auto bg-white p-2'>
                      Add Company? <Link href={'/deck-automation/addCompany'} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
                    </div>
                  }
                </>
                :
                <RenderCompanies companies={companies} />
              }
            </>
        }
      </div>
    </section>
  )
}

export default Companies