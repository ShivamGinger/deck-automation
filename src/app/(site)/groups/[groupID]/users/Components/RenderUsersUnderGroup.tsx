'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import ReactPaginate from 'react-paginate';

import { ITEMS_PER_PAGE } from '@/utils/constants';
import { GroupDetails, UserDetails, UserGroupDetail } from '@/utils/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const RenderUsersUnderGroup = ({
  userUnderGroup,
  groupName
}: {
  userUnderGroup: UserGroupDetail[],
  groupName: string
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const { groupID } = useParams();

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const router = useRouter();

  const totalItems = userUnderGroup?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = userUnderGroup?.slice(startIndex, endIndex);

  const { data: session } = useSession();

  const handleDelete = async (userID: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this user from this group?');

    if (!confirmed) {
      return;
    };

    const response = await fetch(`/api/groups/${groupID}/users/${userID}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.replace(`/groups/`);

    } else {
      const data = await response.json();
      alert(data.error);
    }
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white">
          <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/groups`)}>
            {'<'}
          </div>
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>List of Users under {groupName}</h2>
            {/* <div className='p-2'>
              search ...
            </div> */}
          </div>
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">First Name</th>
                <th className="table-headings">Last Name</th>
                <th className="table-headings">Email</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((detail, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {index + 1}
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.first_name}
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.last_name}
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.email}
                  </td>
                  {
                    session?.user.users_can_delete &&
                    <td>
                      <button
                        onClick={() => handleDelete(detail.user_id)}
                        className='font-semibold py-2 px-6 uppercase bg-transparent rounded-lg border-[#B06500] border-2 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white transition ease-in-out'
                      >
                        Remove
                      </button>
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
          {
            session?.user.users_can_create &&
            <div className='p-4'>
              Add User? <Link href={`/groups/${groupID}/users/addUser`} className='underline text-blue-500' prefetch={false} rel='noopener noreferrer'>Click here</Link>
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

export default RenderUsersUnderGroup