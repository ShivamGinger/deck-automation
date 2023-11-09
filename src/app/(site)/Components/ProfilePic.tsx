import React, { ChangeEvent, useState } from 'react';

const ProfilePic = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  console.log(selectedFile);

  return (
    <div className='mt-6 flex flex-col w-72'>
      <div className='flex flex-row justify-between'>
        <label htmlFor={`profile_pic_upload_`} className='font-semibold pb-2'>Upload Profile Pic</label>
        <div className='pr-2'>
          tick
        </div>
      </div>
      <input type="file" accept='image/*' id={`profile_pic_upload_`} onChange={handleFileChange} />
    </div>
  )
}

export default ProfilePic