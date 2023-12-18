'use client';

import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { AddUserGroudDetails } from '@/utils/types';
import { useSession } from 'next-auth/react';
import CustomSelectUser from './Components/CustomSelectUser';

const AddUser = () => {
  const router = useRouter();
  const { groupID } = useParams();

  const [users, setUsers] = useState<AddUserGroudDetails[]>([]);

  const [selectedUserID, setSelectedUserID] = useState<number>()

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/admin/groups/${groupID}/users`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          setUsers(data.data);
          setSelectedUserID(data.data[0].user_id);
        } else {
          const data = await response.json();
          setError(true);
          setErrorDetails(data.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      if (session?.user.users_can_create) {
        getData();
      } else {
        router.replace('/');
        return;
      }
    };
  }, [groupID, router, session?.user]);

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    const response = await fetch(`/api/groups/${groupID}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: selectedUserID
      }),
      credentials: 'include',
    });

    if (response.ok) {
      router.replace(`/groups/${groupID}/users`);
    } else {
      const data = await response.json();
      setError(true);
      setErrorDetails(data.error);
    }
  };

  return <>
    <section className='bg-[#FEFAEF]'>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/groups/${groupID}/users`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Add User</h1>

          {error &&
            <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
              {errorDeatils}
              <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
            </div>
          }
          <div className="space-y-12 flex flex-col relative">
            {
              loading || error ?
                <Loading />
                :
                <>
                  {users.length > 0 ?
                    <>
                      <CustomSelectUser
                        id={`candidate_company_choose`}
                        value={users.filter(prev => prev.user_id === selectedUserID)[0]?.email}
                        options={users}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedUserID(parseInt(e.target.value))}
                        required
                      />

                      <button
                        onClick={handleSubmit}
                        disabled={error}
                        className={`${error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
                      >
                        Submit
                      </button>
                    </>
                    :
                    <Loading />
                  }
                </>
            }
          </div>
        </div>
      </div>
    </section>
  </>
}

export default AddUser