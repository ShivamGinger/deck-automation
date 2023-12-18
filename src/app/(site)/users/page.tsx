"use client";

import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { QuotientFactorsCount, User, UserDetails } from '@/utils/types';
import { useRouter } from 'next/navigation';
import Loading from '../Components/Loading';
import RenderUsers from './Components/RenderUsers';

const Allusers = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<User[]>([]);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/admin/users', {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setUsers(data.data);
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
      if (session?.user.users_can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }

    }
  }, [router, session?.user]);

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
                {responseDetails || users.length === 0 ?
                  <>
                    {responseDetails}
                    {
                      session?.user.users_can_create &&
                      <div className='overflow-x-auto bg-white p-2'>
                        Add User? <Link href={'/quotients/addQuotient'} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
                      </div>
                    }
                  </>
                  :
                  <RenderUsers users={users} />
                }
              </>
          }
        </div>
      </section >
    </>
  )
}

export default Allusers