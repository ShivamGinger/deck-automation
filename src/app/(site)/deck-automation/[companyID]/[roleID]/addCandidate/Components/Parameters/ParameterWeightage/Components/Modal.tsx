"use client";

import React, { useEffect } from 'react';

interface Modal {
  children: React.ReactNode,
  isModalOpen: boolean,
  handleClose: () => void,
  onHandleSubmit: () => void,
};

const Modal = ({ isModalOpen, handleClose, onHandleSubmit, children }: Modal) => {
  // Close modal on escape key press
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.addEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  // disable scroll on modal load
  useEffect(() => {
    const sideBody = document.getElementById('side-body');

    if (sideBody) {
      sideBody.classList.remove('modal-close');
      sideBody.classList.add('modal-open');
    };

    return () => {
      const sideBody = document.getElementById('side-body');

      if (sideBody) {
        sideBody.classList.remove('modal-open');
        sideBody.classList.add('modal-close');
      };
    }

  }, [isModalOpen]);

  if (!isModalOpen)
    return null;

  return (
    <>
      <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-gray-500 opacity-50'></div>
      <div className='fixed rounded flex flex-col box-border overflow-hidden p-5 bg-gray-100 z-20 inset-y-28 inset-x-1/4'>
        <div className='flex flex-col'>
          <div className='self-end'>
            <button
              onClick={handleClose}
              className='font-semibold border-2 text-[#542C06] border-[#B06500] rounded-lg py-2 px-8 uppercase hover:text-white hover:bg-[#B06500] transition ease-in-out'
            >
              Close
            </button>
          </div>
          <div className='border-b border-black pb-4 w-full'></div>
        </div>
        <div className='box-border h-5/6 overflow-auto mt-4'>{children}</div>
        <div className='pt-4 bg-gray-100'>
          <button
            onClick={onHandleSubmit}
            className='font-semibold border-2 text-[#542C06] border-[#B06500] rounded-lg py-2 px-8 uppercase hover:text-white hover:bg-[#B06500] transition ease-in-out'
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal