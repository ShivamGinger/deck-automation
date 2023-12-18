'use client';

import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';
import { useSession } from 'next-auth/react';

import Select from '../../Components/Select';

const AddGroup = () => {
  const router = useRouter();

  const [groupDetails, setGroupDetails] = useState({
    group_name: '',
    can_read: 'true',
    can_edit: 'true',
    can_create: 'true',
    can_delete: 'true'
  });

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  if (session?.user) {
    if (!session?.user.can_create) {
      router.replace('/');
      return;
    }
  };

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

    const response = await fetch(`/api/groups`, {
      method: 'POST',
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

  return <>
    <section className='bg-[#FEFAEF]'>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/groups`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Add Group</h1>

          {error &&
            <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
              {errorDeatils}
              <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
            </div>
          }
          <div className="space-y-12 flex flex-col relative">
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
              Submit
            </button>
          </div>

        </div>
      </div>
    </section>
  </>
}

export default AddGroup