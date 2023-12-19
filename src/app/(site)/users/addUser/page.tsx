'use client';

import React, { ChangeEvent, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Input from '@/app/(site)/Components/Input';
import { useSession } from 'next-auth/react';
import randToken from 'rand-token';

const AddUser = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  const generateRandomPassword = () => {
    const randomPass = randToken.generate(8);

    setPassword(randomPass);
  }

  useLayoutEffect(() => {
    generateRandomPassword();
  }, []);

  if (session?.user) {
    if (!session?.user.users_can_create) {
      router.replace('/');
      return;
    }
  };

  const handleSubmit = async () => {
    setErrorDetails(null);
    setError(false);

    if (!email || !firstName || !lastName || !password) {
      return;
    }

    const response = await fetch(`/api/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        is_admin: 0
      }),
      credentials: 'include',
    });

    if (response.ok) {
      router.replace('/users');
    } else {
      const data = await response.json();
      setError(true);
      setErrorDetails(data.error);
    }
  };

  return <>
    <section className='bg-[#FEFAEF]'>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/users`)}>
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
            <Input
              name='First Name'
              id='first_name'
              placeholder={firstName}
              required={true}
              moveLabel={firstName != ''}
              type='text'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            />

            <Input
              name='Last name'
              id='last_name'
              placeholder={lastName}
              required={true}
              moveLabel={lastName != ''}
              type='text'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            />

            <Input
              name='Email'
              id='email'
              placeholder={email}
              required={true}
              moveLabel={email != ''}
              type='email'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <Input
              name='Password'
              id='password'
              placeholder={password}
              required={true}
              moveLabel={password != ''}
              type='text'
              aria-disabled={true}
            />

            <button
              onClick={handleSubmit}
              disabled={!email || !firstName || !lastName || !password || error}
              className={`${!email || !firstName || !lastName || !password || error ? 'cursor-not-allowed opacity-50' : ''} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500]`}
            >
              Submit
            </button>
          </div>

        </div>
      </div>
    </section>
  </>
}

export default AddUser