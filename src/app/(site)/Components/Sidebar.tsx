"use client";

import Image from 'next/image';
import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Loading from './Loading';

const Sidebar = () => {
  const path = usePathname();

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    router.replace('/login');
  };

  return (
    <div className='w-80 bg-white flex justify-between flex-col shadow-2xl pr-2 border-r'>
      <div className='flex flex-col gap-2'>
        <div className='p-4 flex flex-col justify-center items-center gap-6 pt-10'>
          <Link href={'/'} prefetch={false} rel='noopener noreferrer'>
            <Image width={150} height={150} src={'/images/Ginger Partners_Logo with tagline.png'} alt="ginger-partners-logo" className="rounded-xl " priority />
          </Link>
          <span className='font-semibold tracking-wide flex flex-col items-center'>
            <span>
              {session?.user?.first_name} {session?.user?.last_name}
            </span>
            <span>
              {session?.user?.email}
            </span>
          </span>
        </div>
        <div className='p-2 flex flex-col gap-4'>
          {
            session?.user ?
              <>
                {
                  session.user.candidate_tracking_can_read &&
                  <Link href={'/candidate-tracking?query='} className={`${path.split('/')[1] === 'candidate-tracking' ? 'custom-brown-btn' : 'custom-brown-btn-bg-transparent hover:bg-[#B06500] hover:text-white hover:border-[#B06500] transition ease-in-out'} text-center`} prefetch={false} rel='noopener noreferrer'>
                    Candidates Tracking
                  </Link>
                }
                {
                  session.user.deck_automation_can_read &&
                  <Link href={'/deck-automation'} className={`${path.split('/')[1] === 'deck-automation' ? 'custom-brown-btn' : 'custom-brown-btn-bg-transparent hover:bg-[#B06500] hover:text-white hover:border-[#B06500] transition ease-in-out'} text-center`} prefetch={false} rel='noopener noreferrer'>
                    Deck Automation
                  </Link>
                }
                {
                  session.user.all_quotients_can_read &&
                  <Link href={'/quotients'} className={`${path.split('/')[1] === 'quotients' ? 'custom-brown-btn' : 'custom-brown-btn-bg-transparent hover:bg-[#B06500] hover:text-white hover:border-[#B06500] transition ease-in-out'} text-center`} prefetch={false} rel='noopener noreferrer'>
                    All Quotients
                  </Link>
                }
                {
                  session.user.users_can_read &&
                  <Link href={'/users'} className={`${path.split('/')[1] === 'users' ? 'custom-brown-btn' : 'custom-brown-btn-bg-transparent hover:bg-[#B06500] hover:text-white hover:border-[#B06500] transition ease-in-out'} text-center`} prefetch={false} rel='noopener noreferrer'>
                    Users
                  </Link>
                }
                {
                  session.user.groups_can_read &&
                  <Link href={'/groups'} className={`${path.split('/')[1] === 'groups' ? 'custom-brown-btn' : 'custom-brown-btn-bg-transparent hover:bg-[#B06500] hover:text-white hover:border-[#B06500] transition ease-in-out'} text-center`} prefetch={false} rel='noopener noreferrer'>
                    Groups
                  </Link>
                }
              </>
              :
              <Loading />
          }
        </div>
      </div>
      <div className='p-2' onClick={() => signOut()}>
        <Image width={28} height={28} src={'/images/logout.png'} alt="logout-icon" className="rounded-xl cursor-pointer" />
      </div>
    </div>
  )
}

export default Sidebar