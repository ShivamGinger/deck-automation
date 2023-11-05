"use client";

import React, { useState } from 'react';

import Link from 'next/link';

import ReactPaginate from 'react-paginate';

const RenderRolesUnderCompany = ({ rolesUnderCompany }: { rolesUnderCompany: { id: number, name: string }[] | undefined }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = rolesUnderCompany?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = rolesUnderCompany?.slice(startIndex, endIndex);

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white flex flex-col">
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">Role Name</th>
                <th className="table-headings">Candidate Count</th>
                <th className="table-headings"></th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((detail, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F7CCA5] rounded-lg'}`} key={index}>
                  <td className="table-row-data">
                    {index + 1}
                  </td>
                  <td className="table-row-data">
                    {detail.name}
                  </td>
                  <td className="table-row-data">
                    Add Candidates <Link href={`/companies/${detail.id}`}>+</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='self-end px-6 py-2'>
            Add Company? <Link href={'/companies/addCompany'} className='underline text-blue-500'>Click here</Link>
          </div>
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
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex mt-8'}
          pageClassName={'px-4 py-2'}
          pageLinkClassName={'border border-gray-300 rounded'}
          activeClassName={'bg-gray-300'}
          previousClassName={`px-4 py-2 border border-gray-300 rounded-l ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          nextClassName={`px-4 py-2 border border-gray-300 rounded-r ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
    </>
  )
}

export default RenderRolesUnderCompany