"use client";

import { ITEMS_PER_PAGE } from '@/utils/constants';
import { CompleteCandidateInformation } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Status from './Status';

const RenderCandidatesForTracking = ({
  candidates
}:
  {
    candidates: CompleteCandidateInformation[]
  }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = candidates?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = candidates?.slice(startIndex, endIndex);

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow bg-white">
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>Candidate Tracking</h2>
            {/* <div className='p-2'>
                search ...
              </div> */}
          </div>
          <div className='flex flex-col'>
            <div className='overflow-x-auto'>
              <table className="w-full border-separate border-spacing-4 px-6 pt-2">
                <thead className="">
                  <tr className='gap-x-4'>
                    <th className="table-headings">S.No.</th>
                    <th className="table-headings">Candidate Name</th>
                    <th className="table-headings">Status</th>
                    <th className="table-headings">Candidate Email</th>
                    <th className="table-headings">Candidate Phone Number</th>
                    <th className="table-headings">Gender</th>
                    <th className="table-headings">Current Position</th>
                    <th className="table-headings">Current Company</th>
                    <th className="table-headings">Current Location</th>
                    <th className="table-headings">Years of Experience</th>
                    <th className="table-headings">Current CTC</th>
                    <th className="table-headings">Variable CTC</th>
                    <th className="table-headings">Expected CTC</th>
                    <th className="table-headings">ESOP / RSU</th>
                    <th className="table-headings">Notice Period</th>
                    <th className="table-headings">Linkedin</th>
                    <th className="table-headings">Key Observations</th>
                    <th className="table-headings">Edit</th>
                  </tr>
                </thead>
                <tbody className="">
                  {currentData?.map((detail, index) => (
                    <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {index + 1}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.candidate_name}
                      </td>

                      <Status candidateStatus={detail.candidate_status} />

                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.email}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.phone_number}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.gender}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.current_position}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.current_company}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.current_location}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.experience}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.fixed_lpa}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.variable_lpa}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.expected_ctc}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.esop_rsu}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.notice_period}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        <Link href={detail.social} target='_blank' rel='noopener noreferrer'>{detail.candidate_name}</Link>
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.description}
                      </td>

                      <td className=" ">
                        <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-between'>
              <div className='p-4 self-center'>
                Add Candidate? <Link href={`/candidate-tracking/addCandidate`} className='underline text-blue-500'>Click here</Link>
              </div>
              <div className='pb-4 pr-4'>
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
            </div>
          </div>

        </div>
      </div>


    </>
  )
}

export default RenderCandidatesForTracking