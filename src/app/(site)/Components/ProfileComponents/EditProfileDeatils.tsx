'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const EditProfileDeatils = () => {
  const { data: session } = useSession();

  return (
    <div className='flex flex-col'>
      <div className="rounded-lg shadow bg-white">
        <div className='p-4 flex flex-row justify-between'>
          <h2 className='font-bold uppercase text-xl text-[#542C06] flex'>
            Profile Details
            <span className='pt-1.5 pl-2'>
              <Link href={`/profile/edit/${session?.user.user_id}`} prefetch={false} rel='noopener noreferrer'>
                <Image width={17} height={17} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
              </Link>
            </span>
          </h2>
        </div>
        <div className='flex flex-col gap-2 p-4 font-semibold tracking-wide'>
          <span>
            First Name: {session?.user?.first_name}
          </span>
          <span>
            Last Name: {session?.user?.last_name}
          </span>
          <span>
            Email: {session?.user?.email}
          </span>
        </div>
      </div>
    </div>
  )
}

export default EditProfileDeatils