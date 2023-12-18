"use client";

import React, { useLayoutEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { QuotientFactorsWeightage } from '@/utils/types';
import { useSession } from 'next-auth/react';
import RenderQuotientsUnderRole from './Components/RenderQuotientsUnderRole';

const DisplayQuotientsUnderRoles = () => {
  const { roleID, companyID } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [quotientsUnderRole, setQuotientsUnderRole] = useState<QuotientFactorsWeightage[]>([]);

  const [roleName, setRoleName] = useState('');

  const [companyName, setCompanyName] = useState('');

  const [errorDeatils, setErrorDetails] = useState<string | null>('');

  const { data: session } = useSession();

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length === 0 && session?.user.all_quotients_can_create) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/addQuotients`);

          } else if (data.data.length > 0) {
            setQuotientsUnderRole(data.data);
            setRoleName(data.data[0].role_name);
            setCompanyName(data.data[0].company_name);
          } else {
            setErrorDetails('No quotients under this role');
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      if (session.user.all_quotients_can_read) {
        getData();

      } else {
        router.replace('/');
        return;
      }
    };
  }, [companyID, roleID, router, session?.user]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading ?
            <Loading /> :
            <>
              {errorDeatils &&
                <>
                  <div className='bg-white p-2'>
                    <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}/${roleID}`)}>
                      {'<'}
                    </div>
                    {errorDeatils}
                  </div>
                </>
              }
              {
                quotientsUnderRole.length !== 0 &&
                <RenderQuotientsUnderRole
                  roleName={roleName}
                  companyName={companyName}
                  quotientsUnderRole={quotientsUnderRole}
                />
              }
            </>
        }
      </div>
    </section>
  )
}

export default DisplayQuotientsUnderRoles