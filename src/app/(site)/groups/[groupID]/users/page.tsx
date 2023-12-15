'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';

import { ParameterFactors, UserGroupDetail } from '@/utils/types';
import Loading from '../../../Components/Loading';

import { useSession } from 'next-auth/react';
import RenderUsersUnderGroup from './Components/RenderUsersUnderGroup';

const UsersUnderGroups = () => {
  const router = useRouter();

  const { groupID } = useParams();

  const [userUnderGroup, setUserUnderGroup] = useState<UserGroupDetail[]>([]);

  const [groupName, setGroupName] = useState('');

  const [loading, setLoading] = useState(true);

  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/groups/${groupID}/users`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setUserUnderGroup(data.data);
          setGroupName(data.data[0].group_name);
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
      if (session?.user.can_create && session.user.can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    }
  }, [groupID, router, session?.user]);

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
                {responseDetails || userUnderGroup.length == 0 ?
                  <>
                    <div className='bg-white'>
                      <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/groups`)}>
                        {'<'}
                      </div>
                      {responseDetails}
                      {
                        session?.user.can_create && session.user.can_read &&
                        <div className='p-4'>
                          Add User? <Link href={`/groups/${groupID}/users/addUser`} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
                        </div>
                      }
                    </div>
                  </>
                  :
                  <RenderUsersUnderGroup
                    userUnderGroup={userUnderGroup}
                    groupName={groupName}
                  />
                }
              </>
          }
        </div>
      </section>
    </>
  )
}

export default UsersUnderGroups