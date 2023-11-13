"use client";

import React, { useLayoutEffect, useState } from 'react';

import Link from 'next/link';

import { ITEMS_PER_PAGE } from '@/utils/constants';
import { getCompanyName, getRoleName } from '@/utils/helperFunctions';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';

type candidate = {
  id: number,
  cname: string,
  email: string,
  totalScore: number,
  Experience: number,
  ctc: number,
  achievement: string,
  description: string,
  profilePic: string
}

const RenderCandidateUnderRoles = ({ candidatesUnderRole }: { candidatesUnderRole: candidate[] | undefined }) => {
  const { roleID, companyID } = useParams();

  const [currentPage, setCurrentPage] = useState(0);

  const [companyName, setCompanyName] = useState();
  const [roleName, setRoleName] = useState();

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = candidatesUnderRole?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = candidatesUnderRole?.slice(startIndex, endIndex);

  useLayoutEffect(() => {
    const getData = async () => {
      const cID = Array.isArray(companyID) ? companyID[0] : companyID;

      const name = await getCompanyName(cID);

      setCompanyName(name);
    }
    getData();
  }, [companyID]);

  useLayoutEffect(() => {
    const getData = async () => {
      const cID = Array.isArray(companyID) ? companyID[0] : companyID;
      const rID = Array.isArray(roleID) ? roleID[0] : roleID;

      const roleName = await getRoleName(cID, rID);

      setRoleName(roleName);
    }
    getData();
  }, [companyID, roleID]);


  const handleDownloadPdf = async (roleID: string | string[], companyID: string | string[], candidateID: number) => {
    try {
      const response = await fetch('/api/demo', {
        method: 'post',
        body: JSON.stringify({
          name: ' nice'
        }),
      })

      const Buffer = await response.json();

      const bufferData = Buffer.data;

      const blob = new Blob([new Uint8Array(bufferData)], { type: 'application/pdf' });

      saveAs(blob, 'downloadedFile.pdf');

    } catch (err) {
      console.log(err);
    };
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white">
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>List of Candidates Under &apos;{roleName}&apos; for &apos;{companyName}&apos;</h2>
            {/* <div className='p-2'>
              search ...
            </div> */}
          </div>
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">Candidate Name</th>
                <th className="table-headings">Candidate Email</th>
                <th className="table-headings">GP Score</th>
                <th className="table-headings">Years of Experience</th>
                <th className="table-headings">Current CTC</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((detail, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {index + 1}
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.cname}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.email}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.totalScore}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.Experience}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.ctc}
                  </td>

                  <td className="" onClick={() => handleDownloadPdf(roleID, companyID, detail.id)}>
                    <Image width={20} height={20} src={'/images/download.png'} alt="edit-icon" className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='p-4'>
            Add Candidates? <Link href={`/deck-automation/${companyID}/${roleID}/addCandidate`} className='underline text-blue-500'>Click here</Link>
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

export default RenderCandidateUnderRoles