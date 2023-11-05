"use client";

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const userUnderAdmin = [
  {
    Candidate_Name: "XYZ",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: ""
  },
  {
    Candidate_Name: "XYZ",
    Candidate_Email: "abc@gmail.com",
    Company: "",
    Role: "",
    Status: ""
  },
];

const AllCandidateListing = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 10;

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
            <table className="w-full border-separate border-spacing-4 px-6 pt-2">
              <thead className="">
                <tr className='gap-x-4'>
                  <th className="table-headings">S.No.</th>
                  <th className="table-headings">Candidate Name</th>
                  <th className="table-headings">Candidate Email</th>
                  <th className="table-headings">Company</th>
                  <th className="table-headings">Role</th>
                  <th className="table-headings">Status</th>
                  <th className="table-headings">Edit</th>
                </tr>
              </thead>
              <tbody className="">
                {currentData?.map((detail, index) => (
                  <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F7CCA5] '}`} key={index}>
                    <td className="table-row-data">
                      {index + 1}
                    </td>
                    <td className="table-row-data">
                      {detail.Candidate_Name}
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
      </div>
    </section>
  )
}

export default AllCandidateListing