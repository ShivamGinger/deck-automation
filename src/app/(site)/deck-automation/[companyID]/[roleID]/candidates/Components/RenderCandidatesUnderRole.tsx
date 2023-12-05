"use client";

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

import { ITEMS_PER_PAGE } from '@/utils/constants';
import { CompleteCandidateInformation, QuotientFactorsWeightage } from '@/utils/types';
import { saveAs } from 'file-saver';
import CanAddCandidate from './CanAddCandidate';

import { CloseButtonProps, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenderCandidatesUnderRole = ({
  roleName,
  companyName,
  candidateDetailsUnderRole
}: {
  roleName: string,
  companyName: string,
  candidateDetailsUnderRole: {
    candidate_id: number,
    profile_pic: string,
    candidate_name: string,
    role_name: string,
    gp_score: string,
    description: string,
  }[]
}) => {
  const { companyID, roleID } = useParams();

  const router = useRouter();

  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const [isHovered, setIsHovered] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalItems = candidateDetailsUnderRole?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentData = candidateDetailsUnderRole?.slice(startIndex, endIndex);

  const customCloseButton = ({ closeToast }: CloseButtonProps) => (
    <div onClick={closeToast}>X</div>
  );

  const handleDownloadPdf = async (roleID: string | string[], companyID: string | string[], candidateID: number, candidateName: string) => {
    document.body.classList.add('loading-cursor');
    document.body.classList.remove('normal-cursor');

    toast('Download Started!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: '#B06500',
        color: '#ffffff',
        border: '2px solid #B06500'
      },
      progressStyle: {
        background: '#ffffff',
        height: '4px',
      },
      closeButton: customCloseButton
    });

    try {
      const response = await fetch('/api/pdf-generate', {
        method: 'post',
        body: JSON.stringify({
          role_id: Array.isArray(roleID) ? parseInt(roleID[0]) : parseInt(roleID),
          company_id: Array.isArray(companyID) ? parseInt(companyID[0]) : parseInt(companyID),
          candidate_id: candidateID
        }),
      });

      if (response.ok) {
        const Buffer = await response.json();

        const bufferData = Buffer.data;

        const blob = new Blob([new Uint8Array(bufferData)], { type: 'application/pdf' });

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace(/:/g, '-');

        saveAs(blob, `report-for-${candidateName}-${formattedDate}.pdf`);
      } else {
        const data = await response.json();
        console.log(data);
        alert("Error generating pdf!");
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast('Download Finished!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#B06500',
          color: '#ffffff',
          border: '2px solid #B06500'
        },
        progressStyle: {
          background: '#ffffff',
          height: '4px',
        },
        closeButton: customCloseButton
      });

      document.body.classList.remove('loading-cursor');
      document.body.classList.add('normal-cursor');
    }
  };

  const handleMultipleDownloadPdf = async (roleID: string | string[], companyID: string | string[]) => {
    if (selectedCandidates.length === 0) {
      toast(`Select Candidates first!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#B06500',
          color: '#ffffff',
          border: '2px solid #B06500'
        },
        progressStyle: {
          background: '#ffffff',
          height: '4px',
        },
        closeButton: customCloseButton
      });
      return;
    }

    document.body.classList.add('loading-cursor');
    document.body.classList.remove('normal-cursor');

    toast('Multiple Download Started!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: '#B06500',
        color: '#ffffff',
        border: '2px solid #B06500'
      },
      progressStyle: {
        background: '#ffffff',
        height: '4px',
      },
      closeButton: customCloseButton
    });

    try {
      const response = await fetch('/api/pdf-generate-multiple', {
        method: 'post',
        body: JSON.stringify({
          role_id: Array.isArray(roleID) ? parseInt(roleID[0]) : parseInt(roleID),
          company_id: Array.isArray(companyID) ? parseInt(companyID[0]) : parseInt(companyID),
          candidate_list: selectedCandidates
        }),
      });


      if (response.ok) {
        const Buffer = await response.json();

        const bufferData = Buffer.data;

        const blob = new Blob([new Uint8Array(bufferData)], { type: 'application/pdf' });

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace(/:/g, '-');

        saveAs(blob, `executive-summary-for-${companyID}-${formattedDate}.pdf`);
      } else {
        const data = await response.json();
        console.log(data);
        alert("Error generating pdf!");
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast('Multiple Download Finished!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#B06500',
          color: '#ffffff',
          border: '2px solid #B06500'
        },
        progressStyle: {
          background: '#ffffff',
          height: '4px',
        },
        closeButton: customCloseButton
      });

      document.body.classList.remove('loading-cursor');
      document.body.classList.add('normal-cursor');
    }
  };

  const handleCheckboxChange = (candidate_id: number) => {
    const updatedSelectedCandidates = [...selectedCandidates];

    if (updatedSelectedCandidates.includes(candidate_id)) {

      const index = updatedSelectedCandidates.indexOf(candidate_id);
      updatedSelectedCandidates.splice(index, 1);
    } else {

      updatedSelectedCandidates.push(candidate_id);
    };

    setSelectedCandidates(updatedSelectedCandidates);
  };

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col'>
        <div className="rounded-lg shadow overflow-x-auto bg-white">
          <div className='p-4 font-bold text-2xl cursor-pointer' onClick={() => router.replace(`/deck-automation/${companyID}`)}>
            {'<'}
          </div>
          <div className='p-4 flex flex-row justify-between'>
            <h2 className='font-bold uppercase text-2xl text-[#542C06]'>List of Candidates for {roleName} Under {companyName}</h2>
            <div className='flex '>
              {/* <div>
                search ...
              </div> */}
              <div className={`flex gap-2 ${selectedCandidates.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handleMultipleDownloadPdf(roleID, companyID)}>
                Multiple Download
                <span className="pt-0.5">
                  <Image width={20} height={20} src={'/images/download.png'} alt="edit-icon" />
                </span>
              </div>
            </div>
          </div>
          <table className="w-full border-separate border-spacing-4 px-6 pt-2">
            <thead className="">
              <tr className='gap-x-4'>
                <th className="table-headings">S.No.</th>
                <th className="table-headings">Candidate</th>
                <th className="table-headings">Candidate Name</th>
                <th className="table-headings">Role</th>
                <th className="table-headings">GP Score</th>
                <th className="table-headings">Key Observations</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((detail, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={index}>
                  <td className={`table-row-data relative ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}
                    onMouseEnter={() => setIsHovered(!isHovered)}
                    onMouseLeave={() => setIsHovered(!isHovered)}
                  >
                    {isHovered ?
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(detail.candidate_id)}
                        checked={selectedCandidates.includes(detail.candidate_id)}
                      /> :
                      <>
                        {index + 1}
                      </>
                    }
                  </td>
                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    <>
                      {detail.profile_pic ?
                        <div className='flex justify-center'>
                          <Image
                            src={detail.profile_pic}
                            width={150}
                            height={0}
                            priority
                            // style={{ width: '150px' }}
                            className="rounded-md h-32"
                            alt={`Profile Pic for ${detail.candidate_name}`}
                            sizes="(max-width: 600px) 100vw, 600px"
                          />
                        </div>
                        :
                        <>
                          No Profile Pic for {detail.candidate_name}
                        </>
                      }
                    </>
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.candidate_name}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.role_name}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {parseFloat(detail.gp_score).toFixed(2)}
                  </td>

                  <td className={`table-row-data ${index % 2 === 0 ? '' : 'bg-[#F7CCA5]'}`}>
                    {detail.description}
                  </td>

                  <td className="" onClick={() => handleDownloadPdf(roleID, companyID, detail.candidate_id, detail.candidate_name)}>
                    <Image width={20} height={20} src={'/images/download.png'} alt="edit-icon" className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='p-4'>
            Add Candidates? <Link href={`/deck-automation/${companyID}/${roleID}/candidates/addCandidate`} className='underline text-blue-500'>Click here</Link>
          </div>
          <div className='p-4 pt-0'>
            View Quotients? <Link href={`/deck-automation/${companyID}/${roleID}/quotients`} className='underline text-blue-500'>Click here</Link>
          </div>
        </div>
      </div >

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

export default RenderCandidatesUnderRole