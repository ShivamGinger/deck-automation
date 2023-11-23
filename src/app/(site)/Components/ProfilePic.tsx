
import React, { ChangeEvent, Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

import Image from 'next/image';

import { HandleCandidateInputChangeValue } from '@/utils/types';

const ProfilePic = (
  {
    handleInputChange,
    candidateNo,
    prevFileUploaded,
    candidateName,
    setErrorDetails,
    setError
  }: {
    handleInputChange: HandleCandidateInputChangeValue,
    candidateNo: number,
    prevFileUploaded: string,
    candidateName: string,
    setErrorDetails: Dispatch<SetStateAction<string | null>>,
    setError: Dispatch<SetStateAction<boolean>>
  }
) => {

  const [fileUploaded, setFileUploaded] = useState(!!prevFileUploaded);

  useLayoutEffect(() => {
    setFileUploaded(!!prevFileUploaded);
  }, [prevFileUploaded]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const formData = new FormData();

      formData.append('profile-pic', file);
      formData.append('candidate-name', candidateName);

      try {
        const response = await fetch('/api/s3-upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();

          setFileUploaded(true);

          handleInputChange(candidateNo, data.imageUrl, 'profile_pic');
        } else {
          const data = await response.json();
          setError(true);
          setErrorDetails(data.error);

          const fileInput = document.getElementById(`profile_pic_upload_${candidateNo}`) as HTMLInputElement;

          if (fileInput) {
            fileInput.value = '';
          }
        }
      } catch (error) {
        console.error('Network error', error);
      }

    }
  };

  const handleProfilePicRemove = () => {
    setFileUploaded(false);

    handleInputChange(candidateNo, '', 'profile_pic');
  };

  return (
    <>
      {fileUploaded ?
        <>
          <div className='mt-6 flex flex-col w-72'>
            <div className='flex flex-row justify-between'>
              <label htmlFor={`profile_pic_upload_`} className='font-semibold pb-2'>Uploaded Profile Picture: </label>
              <div className='pr-2 self-center cursor-pointer flex' onClick={handleProfilePicRemove}>
                <Image width={30} height={30} src={'/images/cross.png'} alt="edit-icon" className="opacity-80 " />
              </div>
            </div>
            {fileUploaded && prevFileUploaded &&
              <>
                <Image
                  src={prevFileUploaded}
                  width={0}
                  height={0}
                  priority
                  className="object-cover rounded-md h-32"
                  style={{ width: "100%" }}
                  alt={`Profile Pic for ${candidateNo}`}
                  sizes="(max-width: 600px) 100vw, 600px"
                />
              </>
            }
          </div>
        </> :
        <div className='mt-6 flex flex-col w-72'>
          <div className='flex flex-row justify-between'>
            <label htmlFor={`profile_pic_upload_${candidateNo}`} className='font-semibold pb-2'>Upload Profile Picture &ensp;<span className='text-red-600 font-bold'>*</span></label>
          </div>
          <input type="file" accept='image/*' id={`profile_pic_upload_${candidateNo}`} onChange={handleFileChange} />
        </div>
      }
    </>
  )
}

export default ProfilePic