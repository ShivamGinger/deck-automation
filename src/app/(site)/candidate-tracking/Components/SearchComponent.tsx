'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [searchQuery, setSearchQuery] = useState(query ? query : '');

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/candidate-tracking?query=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch} >
      <div className="relative h-10 flex">
        <input
          type="text"
          value={searchQuery}
          placeholder='Search Here...'
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`
            peer 
            h-full 
            w-full 
            rounded-[7px]
            bg-transparent           
            px-3 
            py-2.5 
            font-sans 
            text-base 
            transition-all 
            text-gray-500
            focus:text-black
            focus:border-[#542C06]
            border 
            border-[#542C06]           
            focus:outline-0 
            bg-[#FCECDD]
            `}
        />
        <button className={`absolute ${searchQuery ? 'right-1 top-2' : 'right-2 top-3'}`}>
          {
            searchQuery ?
              <Image width={25} height={25} src={'/images/cross.png'} alt="cross-icon" className="cursor-pointer" onClick={() => setSearchQuery('')} />
              :
              <Image width={15} height={15} src={'/images/search.png'} alt="search-icon" className="cursor-pointer" />
          }
        </button>
      </div>
    </form>
  )
}

export default SearchComponent