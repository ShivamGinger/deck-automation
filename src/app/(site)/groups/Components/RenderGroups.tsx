'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import ReactPaginate from 'react-paginate';

import { ITEMS_PER_PAGE } from '@/utils/constants';
import { GroupDetails, UserDetails } from '@/utils/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const RenderGroups = ({
  groups
}: {
  groups: GroupDetails[]
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = groups?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = groups?.slice(startIndex, endIndex);

  const { data: session } = useSession();

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white">
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>List of Groups</h2>
            {/* <div className='p-2'>
              search ...
            </div> */}
          </div>
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">Group Name</th>
                <th className="table-headings">Candidate Tracking</th>
                <th className="table-headings">Deck Automation</th>
                <th className="table-headings">All Quotients</th>
                <th className="table-headings">Users</th>
                <th className="table-headings">Groups</th>
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
                        <span>{detail.group_name}</span>
                        {
                          session?.user.groups_can_edit &&
                          <span className=''>
                            <Link href={`/groups/${detail.group_id}/edit`} prefetch={false} rel='noopener noreferrer'>
                              <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
                            </Link>
                          </span>
                        }
                      </div>
                    </div>
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    <div className='flex justify-center items-center'>
                      <div className='flex flex-col text-start gap-2'>
                        <span>Can Read: {detail.candidate_tracking_can_read ? 'True' : 'False'}</span>
                        <span>Can Edit: {detail.candidate_tracking_can_edit ? 'True' : 'False'}</span>
                        <span>Can Create: {detail.candidate_tracking_can_create ? 'True' : 'False'}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    <div className='flex justify-center items-center'>
                      <div className='flex flex-col text-start gap-2'>
                        <span>Can Read: {detail.deck_automation_can_read ? 'True' : 'False'}</span>
                        <span>Can Edit: {detail.deck_automation_can_edit ? 'True' : 'False'}</span>
                        <span>Can Create: {detail.deck_automation_can_create ? 'True' : 'False'}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    <div className='flex justify-center items-center'>
                      <div className='flex flex-col text-start gap-2'>
                        <span>Can Read: {detail.all_quotients_can_read ? 'True' : 'False'}</span>
                        <span>Can Edit: {detail.all_quotients_can_edit ? 'True' : 'False'}</span>
                        <span>Can Create: {detail.all_quotients_can_create ? 'True' : 'False'}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    <div className='flex justify-center items-center'>
                      <div className='flex flex-col text-start gap-2'>
                        <span>Can Read: {detail.users_can_read ? 'True' : 'False'}</span>
                        <span>Can Create: {detail.users_can_create ? 'True' : 'False'}</span>
                        <span>Can Delete: {detail.users_can_delete ? 'True' : 'False'}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    <div className='flex justify-center items-center'>
                      <div className='flex flex-col text-start gap-2'>
                        <span>Can Read: {detail.groups_can_read ? 'True' : 'False'}</span>
                        <span>Can Edit: {detail.groups_can_edit ? 'True' : 'False'}</span>
                        <span>Can Create: {detail.groups_can_create ? 'True' : 'False'}</span>
                        <span>Can Delete: {detail.groups_can_delete ? 'True' : 'False'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <Link href={`/groups/${detail.group_id}/users`} prefetch={false} rel='noopener noreferrer'>
                      <Image width={20} height={20} src={'/images/plus.png'} alt="view-more-icon" className="cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            session?.user.groups_can_create &&
            <div className='p-4'>
              Add Group? <Link href={'/groups/addGroup'} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
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

export default RenderGroups