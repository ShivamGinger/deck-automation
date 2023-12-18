'use client';

import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';
import { useSession } from 'next-auth/react';

import Select from '../../Components/Select';
import { Group } from '@/utils/types';

const AddGroup = () => {
  const router = useRouter();

  const [groupDetails, setGroupDetails] = useState<Group>({
    group_name: '',
    candidate_tracking_can_read: 'true',
    candidate_tracking_can_edit: 'true',
    candidate_tracking_can_create: 'true',
    deck_automation_can_read: 'true',
    deck_automation_can_edit: 'true',
    deck_automation_can_create: 'true',
    all_quotients_can_read: 'true',
    all_quotients_can_edit: 'true',
    all_quotients_can_create: 'true',
    users_can_read: 'true',
    users_can_create: 'true',
    users_can_delete: 'true',
    groups_can_read: 'true',
    groups_can_edit: 'true',
    groups_can_create: 'true',
    groups_can_delete: 'true',
  });

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  if (session?.user) {
    if (!session?.user.groups_can_create) {
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
        candidate_tracking_can_read: groupDetails.candidate_tracking_can_read === 'true' ? 1 : 0,
        candidate_tracking_can_edit: groupDetails.candidate_tracking_can_edit === 'true' ? 1 : 0,
        candidate_tracking_can_create: groupDetails.candidate_tracking_can_create === 'true' ? 1 : 0,
        deck_automation_can_read: groupDetails.deck_automation_can_read === 'true' ? 1 : 0,
        deck_automation_can_edit: groupDetails.deck_automation_can_edit === 'true' ? 1 : 0,
        deck_automation_can_create: groupDetails.deck_automation_can_create === 'true' ? 1 : 0,
        all_quotients_can_read: groupDetails.all_quotients_can_read === 'true' ? 1 : 0,
        all_quotients_can_edit: groupDetails.all_quotients_can_edit === 'true' ? 1 : 0,
        all_quotients_can_create: groupDetails.all_quotients_can_create === 'true' ? 1 : 0,
        users_can_read: groupDetails.users_can_read === 'true' ? 1 : 0,
        users_can_create: groupDetails.users_can_create === 'true' ? 1 : 0,
        users_can_delete: groupDetails.users_can_delete === 'true' ? 1 : 0,
        groups_can_read: groupDetails.groups_can_read === 'true' ? 1 : 0,
        groups_can_edit: groupDetails.groups_can_edit === 'true' ? 1 : 0,
        groups_can_create: groupDetails.groups_can_create === 'true' ? 1 : 0,
        groups_can_delete: groupDetails.groups_can_delete === 'true' ? 1 : 0,
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

  console.log(groupDetails);

  return <>
    <section className='bg-[#FEFAEF]'>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/groups`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="ginger-partners-logo" className="rounded-xl " priority />
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

            <div className='flex flex-col'>
              <p className='text-[16px] leading-tight font-semibold'>
                Add Candidate Tracking permissions
              </p>
              <Select
                title='Can Read'
                id={`candidate_tracking_can_read`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'candidate_tracking_can_read')}
                required
              />
              <Select
                title='Can Edit'
                id={`candidate_tracking_can_edit`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'candidate_tracking_can_edit')}
                required
              />
              <Select
                title='Can Create'
                id={`candidate_tracking_can_create`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'candidate_tracking_can_create')}
                required
              />
            </div>

            <div className='flex flex-col'>
              <p className='text-[16px] leading-tight font-semibold'>
                Add Deck Automation permissions
              </p>
              <Select
                title='Can Read'
                id={`deck_automation_can_read`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'deck_automation_can_read')}
                required
              />
              <Select
                title='Can Edit'
                id={`deck_automation_can_edit`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'deck_automation_can_edit')}
                required
              />
              <Select
                title='Can Create'
                id={`deck_automation_can_create`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'deck_automation_can_create')}
                required
              />
            </div>

            <div className='flex flex-col'>
              <p className='text-[16px] leading-tight font-semibold'>
                Add All Quotients permissions
              </p>
              <Select
                title='Can Read'
                id={`all_quotients_can_read`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'all_quotients_can_read')}
                required
              />
              <Select
                title='Can Edit'
                id={`all_quotients_can_edit`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'all_quotients_can_edit')}
                required
              />
              <Select
                title='Can Create'
                id={`all_quotients_can_create`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'all_quotients_can_create')}
                required
              />
            </div>

            <div className='flex flex-col'>
              <p className='text-[16px] leading-tight font-semibold'>
                Add Users permissions
              </p>
              <Select
                title='Can Read'
                id={`users_can_read`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'users_can_read')}
                required
              />
              <Select
                title='Can Create'
                id={`users_can_create`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'users_can_create')}
                required
              />
              <Select
                title='Can Delete'
                id={`users_can_delete`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'users_can_delete')}
                required
              />
            </div>

            <div className='flex flex-col'>
              <p className='text-[16px] leading-tight font-semibold'>
                Add Groups permissions
              </p>
              <Select
                title='Can Read'
                id={`groups_can_read`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'groups_can_read')}
                required
              />
              <Select
                title='Can Edit'
                id={`groups_can_edit`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'groups_can_edit')}
                required
              />
              <Select
                title='Can Create'
                id={`groups_can_create`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'groups_can_create')}
                required
              />
              <Select
                title='Can Delete'
                id={`groups_can_delete`}
                options={[{ value: 'true', text: 'True' }, { value: 'false', text: 'False' }]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target.value, 'groups_can_delete')}
                required
              />
            </div>

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