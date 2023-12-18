"use client";

import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { GroupDetails } from '@/utils/types';
import { useRouter } from 'next/navigation';
import Loading from '../Components/Loading';
import RenderGroups from './Components/RenderGroups';

const Allgroups = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [groups, setGroups] = useState<GroupDetails[]>([]);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/groups', {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setGroups(data.data);
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
      if (session?.user.groups_can_read) {
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
                {responseDetails || groups.length === 0 ?
                  <>
                    {responseDetails}
                    {
                      session?.user.groups_can_create &&
                      <div className='p-4'>
                        Add Group? <Link href={'/groups/addGroup'} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
                      </div>
                    }
                  </>
                  :
                  <RenderGroups groups={groups} />
                }
              </>
          }
        </div>
      </section >
    </>
  )
}

export default Allgroups