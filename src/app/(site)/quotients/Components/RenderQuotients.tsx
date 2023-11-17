'use client';

import { ITEMS_PER_PAGE } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const RenderQuotients = ({ quotients }: { quotients: { id: number, qname: string, count: number }[] }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = quotients?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = quotients?.slice(startIndex, endIndex);

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white">
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>List of Quotients</h2>
            {/* <div className='p-2'>
              search ...
            </div> */}
          </div>
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">Quotient Name</th>
                <th className="table-headings">Parameters Count</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((detail, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {index + 1}
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.qname}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.count ? detail.count : 0}
                  </td>

                  <td className="">
                    <Link href={`/quotients/${detail.id}`}>
                      <Image width={20} height={20} src={'/images/plus.png'} alt="edit-icon" className="cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='p-4'>
            Add Quotient? <Link href={'/quotients/addQuotient'} className='underline text-blue-500'>Click here</Link>
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

export default RenderQuotients