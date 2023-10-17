import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <Link href={'/deck-automation'} className='font-semibold p-2 border-2 border-gray-200'>
      Click here for deck-automation
    </Link>
  )
}

export default page