"use client";

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import ReactPaginate from 'react-paginate';

import { ITEMS_PER_PAGE } from '@/utils/constants';
import { CompanyDetailsRoleCount } from '@/utils/types';
import { useSession } from 'next-auth/react';

const RenderCompanies = ({
  companies
}: {
  companies: CompanyDetailsRoleCount[]
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = companies?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = companies?.slice(startIndex, endIndex);

  const { data: session } = useSession();

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white">
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>List of Companies</h2>
            {/* <div className='p-2'>
              search ...
            </div> */}
          </div>
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">Company Name</th>
                <th className="table-headings">Roles Count</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((detail, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {index + 1}
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    <div className='flex justify-center'>
                      <div className='flex gap-2'>
                        <span>{detail.company_name}</span>
                        {
                          session?.user.deck_automation_can_edit &&
                          <span className=''>
                            <Link href={`/deck-automation/edit/${detail.company_id}`} prefetch={false} rel='noopener noreferrer'>
                              <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
                            </Link>
                          </span>
                        }
                      </div>
                    </div>
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.roles_count ? detail.roles_count : 0}
                  </td>

                  <td className="">
                    <Link href={`/deck-automation/${detail.company_id}`} prefetch={false} rel='noopener noreferrer'>
                      <Image width={20} height={20} src={'/images/plus.png'} alt="view-more-icon" className="cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            session?.user.deck_automation_can_create &&
            <div className='p-4'>
              Add Company? <Link href={'/deck-automation/addCompany'} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
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

export default RenderCompanies