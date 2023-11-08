"use client";

import { ITEMS_PER_PAGE } from '@/utils/constants';
import Image from 'next/image';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Status from './Components/Status';

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

const userUnderAdmin = [
  {
    Candidate_Name: "1",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[0]
  },
  {
    Candidate_Name: "2",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[1]
  },
  {
    Candidate_Name: "3",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[2]
  },
  {
    Candidate_Name: "4",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[3]
  },
  {
    Candidate_Name: "5",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[4]
  },
  {
    Candidate_Name: "6",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[5]
  },
  {
    Candidate_Name: "7",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[6]
  },
  {
    Candidate_Name: "8",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: status[7]
  },
];


const AllCandidateListing = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = userUnderAdmin?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = userUnderAdmin?.slice(startIndex, endIndex);

  return (
    <section className='mt-12'>
      <div className='max-w-screen-2xl mx-auto flex flex-col'>
        <div className='flex flex-col'>
          <div className="rounded-lg shadow overflow-x-auto bg-white">
            <div className='p-4 flex flex-row justify-between'>
              <h2 className='font-bold uppercase text-2xl text-[#542C06]'>Candidate Tracking</h2>
              <div className='p-2'>
                search ...
              </div>
            </div>
            <table className="w-full border-separate border-spacing-4 px-6 pt-2">
              <thead className="">
                <tr className='gap-x-4'>
                  <th className="table-headings">S.No.</th>
                  <th className="table-headings">Candidate Name</th>
                  <th className="table-headings">Candidate Email</th>
                  <th className="table-headings">Current Company</th>
                  <th className="table-headings">Years of Experience</th>
                  <th className="table-headings">Current CTC</th>
                  <th className="table-headings">Role</th>
                  <th className="table-headings">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {currentData?.map((detail, index) => (
                  <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      {index + 1}
                    </td>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      {detail.Candidate_Name}
                    </td>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      email
                    </td>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      curr company
                    </td>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      years of exp
                    </td>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      curr ctc
                    </td>
                    <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                      role
                    </td>

                    <Status candidateStatus={detail.Status} />

                    <td className=" ">
                      <Image width={20} height={20} src={'/images/edit.png'} alt="edit-icon" className="cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>
    </section>
  )
}

export default AllCandidateListing