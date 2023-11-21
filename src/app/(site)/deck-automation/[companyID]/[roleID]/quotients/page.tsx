"use client";

import React, { useLayoutEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Loading from '@/app/(site)/Components/Loading';
import { QuotientFactorsWeightage } from '@/utils/types';
import RenderQuotientsUnderRole from './Components/RenderQuotientsUnderRole';

const DisplayQuotientsUnderRoles = () => {
  const { roleID, companyID } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [quotientsUnderRole, setQuotientsUnderRole] = useState<QuotientFactorsWeightage[]>([]);

  const [roleName, setRoleName] = useState('');

  const [companyName, setCompanyName] = useState('');

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyID}/roles/${roleID}/quotients`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data.length === 0) {
            router.replace(`/deck-automation/${companyID}/${roleID}/quotients/addQuotients`);

          } else {
            setQuotientsUnderRole(data.data);
            setRoleName(data.data[0].role_name);
            setCompanyName(data.data[0].company_name);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [companyID, roleID, router]);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        {
          loading || quotientsUnderRole.length === 0 ?
            <Loading /> :
            <>
              {
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