import React from 'react'

const Loading = () => {
  return <div className="flex flex-wrap ">
    <div role="status" className="max-w-screen-xl animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
      <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
      <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
    </div>
  </div>
}

export default Loading