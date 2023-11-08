'use client';

import Input from '@/app/(site)/Components/Input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import EyeHide from './Components/EyeHide';
import EyeShow from './Components/EyeShow';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [responseSucessful, setResponseSucessful] = useState(false);
  const [sucessDetails, setSucessDetails] = useState('');

  const [responseError, setResponseError] = useState(false);
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState<{ field: string, message: string }[] | null>();

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace('/');
    }
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials: 'include',
      });

      if (response.status === 400) {
        const errorData = await response.json();

        setResponseSucessful(false);
        setResponseError(true);
        setError(errorData.error);
        setErrorDetails(errorData.details);
      } else if (response.status === 409) {
        const errorData = await response.json();

        setResponseSucessful(false);
        setResponseError(true);
        setError(errorData.error);
        setErrorDetails(null);
      } else if (response.status === 500) {
        const errorData = await response.json();

        setResponseSucessful(false);
        setResponseError(true);
        setError(errorData.error);
        setErrorDetails(null);
      } else if (response.status === 200) {
        const sucessData = await response.json();

        setSucessDetails(sucessData.msg);
        setResponseSucessful(true);
        setResponseError(false);
      }

      console.log("res: " + response);
    } catch (error) {
      console.log("Error " + error);
    }
  };

  return (
    <section className='bg-[#FEFAEF] '>
      <div className='max-w-screen-2xl mx-auto bg-white shadow-2xl px-4 md:px-0 md:mt-10 rounded-xl '>
        <div className='flex justify-center py-12 flex-col items-center gap-12'>
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Register</h1>
          {responseError &&
            <>
              <div className="bg-red-500 p-4 rounded-md md:w-80 w-full flex flex-row justify-between ">
                <p className="text-base text-gray-50 font-semibold ">
                  {error}
                  <span className='flex flex-col'>
                    {errorDetails?.map(({ field, message }, index) => (
                      <span key={index}>Field {field} : {message}</span>
                    ))}
                  </span>
                </p>
                <p className="text-base text-gray-50 font-semibold cursor-pointer" onClick={() => setResponseError(false)}>
                  X
                </p>
              </div>
            </>
          }
          {responseSucessful &&
            <>
              <div className="bg-green-500 p-4 rounded-md md:w-80 w-full flex flex-row justify-between ">
                <p className="text-base text-gray-50 font-semibold w-3/4">
                  {sucessDetails}
                </p>
                <p className="text-base text-gray-50 font-semibold cursor-pointer" onClick={() => setResponseSucessful(false)}>
                  X
                </p>
              </div>
            </>
          }
          <form className="space-y-8 relative" >
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
              name='Password (min: 6)'
              id='password'
              type={`${showPassword ? 'text' : 'password'}`}
              placeholder={password}
              required={true}
              moveLabel={password != ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <span className='absolute top-12 right-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeShow /> : <EyeHide />}
            </span>
            <button
              type='submit'
              className={` ${!email || !password ? "cursor-not-allowed opacity-50" : ""} custom-brown-btn w-full`}
              disabled={!email || !password}
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
          <div className='flex gap-2'>
            <p>Login with an exsisting account</p>
            <Link href={'/login'} className='underline text-blue-500'>Click Here</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register