'use client';

import Input from '@/app/(site)/Components/Input';
import Loading from '@/app/(site)/Components/Loading';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

const EditProfilePage = () => {
  const router = useRouter();
  const { userID } = useParams();
  const { data: session } = useSession();

  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  useLayoutEffect(() => {
    if (!session?.user) {
      return
    } else {
      setUserDetails(prevUserDetails => ({
        ...prevUserDetails,
        first_name: session.user.first_name || '',
        last_name: session.user.last_name || ''
      }));
    }
  }, [session?.user]);

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const handleInputChange = (value: string, field: string) => {
    const updatedUserDetails = { ...userDetails, [field]: value };

    setUserDetails(updatedUserDetails);
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (Object.values(userDetails).some(value => value === '')) {
      return;
    };

    try {
      const response = await fetch(`/api/admin/users/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: userDetails.first_name,
          last_name: userDetails.last_name,
          old_password: userDetails.old_password,
          new_password: userDetails.new_password,
          confirm_new_password: userDetails.confirm_new_password
        }),
        credentials: 'include',
      });

      if (response.ok) {
        signOut();
      } else {
        const data = await response.json();
        setError(true);
        setErrorDetails(data.error);
      }
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/`)}>
          {'<'}
        </div>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Edit Profile</h1>
          {
            session?.user ?
              <>
                {error &&
                  <div className='bg-red-500 p-4 text-white font-semibold rounded-md flex justify-between '>
                    {errorDeatils}
                    <span onClick={() => setError(false)} className='cursor-pointer'>X</span>
                  </div>
                }
                <div className="space-y-12 flex flex-col">
                  <Input
                    name='First Name'
                    id='first_name'
                    placeholder={userDetails.first_name}
                    required={true}
                    type='text'
                    moveLabel={userDetails.first_name != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'first_name')}
                  />
                  <Input
                    name='Last Name'
                    id='last_name'
                    placeholder={userDetails.last_name}
                    required={true}
                    type='text'
                    moveLabel={userDetails.last_name != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'last_name')}
                  />
                  <Input
                    name='Old Password'
                    id='old_password'
                    placeholder={userDetails.old_password}
                    required={true}
                    type='password'
                    moveLabel={userDetails.old_password != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'old_password')}
                  />
                  <Input
                    name='New Password'
                    id='new_password'
                    placeholder={userDetails.new_password}
                    required={true}
                    type='password'
                    moveLabel={userDetails.new_password != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'new_password')}
                  />
                  <Input
                    name='Confirm New Password'
                    id='confirm_new_password'
                    placeholder={userDetails.confirm_new_password}
                    required={true}
                    type='password'
                    moveLabel={userDetails.confirm_new_password != ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'confirm_new_password')}
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={Object.values(userDetails).some(value => value === '') || error}
                    className={`${Object.values(userDetails).some(value => value === '') || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
                  >
                    Update
                  </button>
                </div>
              </>
              :
              <Loading />
          }

        </div>
      </div>
    </section>
  )
}

export default EditProfilePage