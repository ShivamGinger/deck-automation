'use client';

import Input from '@/app/(site)/Components/Input';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import EyeHide from '../register/Components/EyeHide';
import EyeShow from '../register/Components/EyeShow';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [responseError, setResponseError] = useState(false);
  const [error, setError] = useState<string | null>();

  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace('/');
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
          <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          <h1 className='text-xl font-bold uppercase'>Login</h1>
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
          <form className="space-y-8 relative">
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
              className={` ${!email || !password ? "cursor-not-allowed opacity-50" : ""} font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500] w-full`}
              disabled={!email || !password}
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
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