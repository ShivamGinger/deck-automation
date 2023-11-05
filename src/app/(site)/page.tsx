import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <Link href={'/deck-automation'} className='font-semibold p-2 border-2 border-gray-200'>
        Click here for deck-automation
      </Link>
      <Link href={'/html2pdf'} className='font-semibold p-2 border-2 border-gray-200'>
        html2pdf
      </Link>
      <Link href={'/listing'} className='font-semibold p-2 border-2 border-gray-200'>
        All candidates
      </Link>
      <Link href={'/companies'} className='font-semibold p-2 border-2 border-gray-200'>
        Companies
      </Link>
    </>
  )
}

export default page