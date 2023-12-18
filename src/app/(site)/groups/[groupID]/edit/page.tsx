'use client';

import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';
import Loading from '@/app/(site)/Components/Loading';
import Select from '@/app/(site)/Components/Select';
import { useSession } from 'next-auth/react';

const EditGroup = () => {
  const router = useRouter();

  const { groupID } = useParams();

  const [groupDetails, setGroupDetails] = useState({
    group_name: '',
    can_read: 'true',
    can_edit: 'true',
    can_create: 'true',
    can_delete: 'true'
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/groups/${groupID}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();

          setGroupDetails({
            group_name: data.data[0].group_name,
            can_read: 'true',
            can_edit: 'true',
            can_create: 'true',
            can_delete: 'true'
          })

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
      if (session?.user.can_edit && session.user.can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    }
  }, [groupID, router, session?.user]);

  const handleInputChange = (value: string, field: string) => {
    const updatedGroupDetails = { ...groupDetails, [field]: value };

    setGroupDetails(updatedGroupDetails);
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!groupDetails.group_name) {
      return;
    }

    const response = await fetch(`/api/groups/${groupID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group_name: groupDetails.group_name,
        can_read: groupDetails.can_read === 'true' ? 1 : 0,
        can_edit: groupDetails.can_edit === 'true' ? 1 : 0,
        can_create: groupDetails.can_create === 'true' ? 1 : 0,
        can_delete: groupDetails.can_delete === 'true' ? 1 : 0
      }),
      credentials: 'include',
    });

    if (response.ok) {
      router.replace('/groups');
    } else {
      const data = await response.json();
      setError(true);
      setErrorDetails(data.error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this group?');

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/groups/${groupID}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.replace('/groups');
    } else {
      const data = await response.json();
      setError(true);
      setErrorDetails(data.error);
    }
  };

  return <>
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/groups`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Edit Group</h1>

          {error &&
            <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
              {errorDeatils}
              <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
            </div>
          }
          <div className="space-y-12 flex flex-col">
            {
              loading ?
                <Loading />
                :
                <>
                  <Input
                    name='Group Name'
                    id='group_name'
                    placeholder={groupDetails.group_name}
                    required={true}
                    moveLabel={groupDetails.group_name != ''}
                    type='text'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'group_name')}
                  />

                  <Select
                    title='Can Edit'
                    id={`can_edit`}
                    options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'can_edit')}
                    required
                  />

                  <Select
                    title='Can Read'
                    id={`can_read`}
                    options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'can_read')}
                    required
                  />

                  <Select
                    title='Can Create'
                    id={`can_create`}
                    options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'can_create')}
                    required
                  />

                  <Select
                    title='Can Delete'
                    id={`can_delete`}
                    options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'can_delete')}
                    required
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={!groupDetails.group_name || error}
                    className={`${!groupDetails.group_name || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
                  >
                    Update
                  </button>
                  {
                    session?.user.can_delete &&
                    <div>
                      <h1 className='text-lg font-medium border-b-2 border-red-500 '>Danger Zone</h1>
                      <div className='flex flex-col py-4'>
                        <div className='flex justify-between items-center'>
                          <span>Delete Group</span>
                          <button
                            onClick={handleDelete}
                            className='font-semibold py-2 px-6 uppercase bg-transparent rounded-lg border-[#B06500] border-2 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white transition ease-in-out'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                </>
            }
          </div>
        </div>
      </div>
    </section>
  </>
}

export default EditGroup