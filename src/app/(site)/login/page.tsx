'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Input from '../deck-automation/Components/Input';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [responseError, setResponseError] = useState(false);
  const [error, setError] = useState<string | null>();

  const session = useSession();

  console.log(session);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace('/deck-automation');
    }
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (response?.error) {
        setResponseError(true);
        setError('Invalid email or password');
      } else {
        setResponseError(false);
        setError(null);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <h1 className='text-xl font-bold uppercase'>Login page</h1>
          {responseError &&
            <>
              <div className="bg-red-500 p-4 rounded-md md:w-80 w-full flex flex-row justify-between ">
                <p className="text-base text-gray-50 font-semibold ">
                  {error}
                </p>
                <p className="text-base text-gray-50 font-semibold cursor-pointer" onClick={() => setResponseError(false)}>
                  X
                </p>
              </div>
            </>
          }
          <div className="space-y-8 ">
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
              type='password'
              placeholder={password}
              required={true}
              moveLabel={password != ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <button
              type='submit'
              className={` ${!email || !password ? "cursor-not-allowed opacity-50" : ""} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500] w-full`}
              disabled={!email || !password}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className='flex gap-2'>
            <p>Dont have an account?</p>
            <Link href={'/register'} className='underline text-blue-500'>Click Here</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login