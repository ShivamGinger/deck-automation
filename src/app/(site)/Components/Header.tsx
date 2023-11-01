"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className='p-6 bg-white shadow-xl z-10'>
      <div className='max-w-screen-2xl mx-auto flex justify-between'>
        <div>
          <Link href={'/'}>Header</Link>
        </div>
        <div className='flex gap-2'>
          {!session ?
            <>
              <Link href={'/login'}>Login</Link>
              <Link href={'/register'}>Register</Link>
            </>
            :
            <>
              {session.user?.email}
              <button
                onClick={() => {
                  signOut();
                }}
                className={` font-semibold py-2 px-8 uppercase bg-[#B06500] text-white rounded-lg border-[#B06500] w-full`}
              >
                Logout
              </button>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default Header