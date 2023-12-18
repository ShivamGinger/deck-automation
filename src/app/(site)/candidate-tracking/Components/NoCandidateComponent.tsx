import React from 'react'
import SearchComponent from './SearchComponent'

const NoCandidateComponent = () => {
  return (
    <div className='flex flex-col'>
      <div className="rounded-lg shadow bg-white">
        <div className='p-4 flex flex-row justify-between'>
          <h2 className='font-bold uppercase text-2xl text-[#542C06]'>Candidate Tracking</h2>
          <div className='p-2 flex items-center gap-4'>
            <div>
              <SearchComponent />
            </div>
          </div>
        </div>
        <div className='p-4'>
          Searched Candidate not found
        </div>
      </div>
    </div>
  )
}

export default NoCandidateComponent