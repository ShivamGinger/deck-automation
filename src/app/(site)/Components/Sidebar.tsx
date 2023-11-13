"use client";

import Image from 'next/image';
import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
  const path = usePathname();

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    router.replace('/login');
  }

  return (
    <div className='w-80 bg-white flex justify-between flex-col shadow-2xl pr-2 border-r'>
      <div className='flex flex-col gap-2'>
        <div className='p-4 flex flex-col justify-center items-center gap-6 pt-10'>
          <Link href={'/'}>
            <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="profile pic" className="rounded-xl " priority />
          </Link>
          <span className='font-semibold tracking-wide'>
            {session?.user?.email}
          </span>
        </div>
        <div className='p-2 flex flex-col gap-4'>
          <Link href={'/candidate-tracking'} className={`${path.split('/')[1] === 'candidate-tracking' ? 'custom-brown-btn' : 'custom-brown-btn-bg-transparent hover:bg-[#B06500] hover:text-white hover:border-[#B06500] transition ease-in-out'} text-center`}>
            Candidates Tracking
          </Link>
          <Link href={'/deck-automation'} className={`${path.split('/')[1] === 'deck-automation' ? 'custom-brown-btn' : 'custom-brown-btn-bg-transparent hover:bg-[#B06500] hover:text-white hover:border-[#B06500] transition ease-in-out'} text-center`}>
            Deck Automation
          </Link>
        </div>
      </div>
      <div className='p-2' onClick={() => signOut()}>
        <Image width={28} height={28} src={'/images/logout.png'} alt="profile pic" className="rounded-xl cursor-pointer" />
      </div>
    </div>
  )
}

export default Sidebar