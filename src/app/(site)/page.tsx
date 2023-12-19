'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';
import Loading from './Components/Loading';
import EditProfileDeatils from './Components/ProfileComponents/EditProfileDeatils';

const Page = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { data: session } = useSession();

  useLayoutEffect(() => {
    setLoading(true);

    if (session?.user) {
      if (session.user.user_id) {
        setLoading(false);

      } else {
        setLoading(true);
        return;
      }
    };
  }, [router, session?.user]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <>
              <Loading />
            </> :
            <>
              <EditProfileDeatils />
            </>
        }
      </div>
    </section>
  )
}

export default Page