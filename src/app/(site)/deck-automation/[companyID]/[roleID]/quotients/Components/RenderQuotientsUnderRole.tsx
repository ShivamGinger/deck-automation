"use client";

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

import { ITEMS_PER_PAGE } from '@/utils/constants';
import { QuotientFactorsWeightage } from '@/utils/types';
import { useSession } from 'next-auth/react';

const RenderQuotientsUnderRole = ({
  roleName,
  companyName,
  quotientsUnderRole
}: {
  roleName: string,
  companyName: string,
  quotientsUnderRole: QuotientFactorsWeightage[]
}) => {
  const { companyID, roleID } = useParams();

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = quotientsUnderRole?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = quotientsUnderRole?.slice(startIndex, endIndex);
  const { data: session } = useSession();

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white">
          <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}/${roleID}`)}>
            {'<'}
          </div>
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>Quotient details for {roleName} Under {companyName}</h2>
            {/* <div className='p-2'>
              search ...
            </div> */}
          </div>
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">Quotient Name</th>
                <th className="table-headings">Quotient Weightage</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((detail, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {index + 1}
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.quotient_name}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.quotient_weightage}
                  </td>

                  <td className="">
                    <Link href={`/deck-automation/${companyID}/${roleID}/quotients/${detail.quotient_weightage_id}?qid=${detail.quotient_id}`} prefetch={false} rel='noopener noreferrer'>
                      <Image width={20} height={20} src={'/images/plus.png'} alt="view-more-icon" className="cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            session?.user.deck_automation_can_read &&
            <div className='p-4'>
              View Candidates? <Link href={`/deck-automation/${companyID}/${roleID}/candidates`} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
            </div>
          }
        </div>
      </div>

      <div className='self-end'>
        <ReactPaginate
          previousLabel={
            <span className={`${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Previous
            </span>
          }
          nextLabel={
            <span className={`${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Next
            </span>
          }
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={'flex mt-8 gap-2'}
          activeClassName={'custom-brown-btn-pagination'}
          pageClassName={'font-semibold border-2 text-[#542C06] border-[#B06500] rounded-lg py-2 px-2 uppercase'}
          pageLinkClassName={''}
          previousClassName={`${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''} custom-brown-btn-pagination-bg-transparent`}
          nextClassName={`${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''} custom-brown-btn-pagination-bg-transparent`}
        />
      </div>
    </>
  )
}

export default RenderQuotientsUnderRole