"use client";

import { CandidateInfo, CandidateInformation, ITEMS_PER_PAGE } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Status from './Status';

const status = [
  'yet_to_share',
  'joined',
  'negotiation',
  'in_process',
  'on_hold',
  'feedback_pending',
  'dropped_out',
  'rejected'
]

interface Candidate extends CandidateInformation {
  company: string,
  role: string
}

const AllCandidateListing = ({ candidates }: { candidates: Candidate[] }) => {
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
                        {detail.name}
                      </td>

                      <Status candidateStatus={status[1]} />

                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.email}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.phNum}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.gender}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.currPos}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.currCmp}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.currLoc}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.experience}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.fixedLpa}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.varLpa}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.expectedCtc}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.esopRsu}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.noticePeriod}
                      </td>
                      <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                        {detail.social}
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

export default AllCandidateListing