import React from 'react';
import { IoSearchOutline } from "react-icons/io5";

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center justify-between gap-4 p-3 max-h-10 bg-[#F0F0F0] rounded-[0.375rem] ">
      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="outline-none"
      />
      <IoSearchOutline className='w-4' />
    </div>
  );
};

export default SearchBar;