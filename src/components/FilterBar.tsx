import React, { useState } from 'react';
import type { Camera } from '../types/Camera';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import statusimg from '../assets/status.png';

interface Props {
  statusFilter: string;
  locationFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  setLocationFilter: React.Dispatch<React.SetStateAction<string>>;
  cameras: Camera[];
}

const FilterBar: React.FC<Props> = ({
  statusFilter,
  locationFilter,
  setStatusFilter,
  setLocationFilter,
  cameras,
}) => {
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isStatusOpen, setStatusOpen] = useState(false);

  const uniqueLocations = Array.from(new Set(cameras.map((cam) => cam.location)));

  return (
    <div className="flex flex-col md:flex-row py-1 px-3 bg-[#FFFFFF] gap-3 md:gap-4 w-full">
  <div className="border flex items-center border-[#CED4DA] p-2 rounded-md w-full md:w-[20%] lg:w-[15%] relative">
    <CiLocationOn className="w-4 h-4 text-[#7E7E7E]" />
    <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      onClick={() => setLocationOpen(!isLocationOpen)}
      onBlur={() => setLocationOpen(false)}
      className="px-2 pr-6 font-inter font-medium text-[#7E7E7E] text-[0.875rem] appearance-none outline-none w-full bg-transparent"
    >
      <option value="">Location</option>
      {uniqueLocations.map((loc, i) => (
        <option key={i} value={loc}>
          {loc}
        </option>
      ))}
    </select>
    {isLocationOpen ? (
      <FaChevronUp className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
    ) : (
      <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
    )}
  </div>

  <div className="border flex items-center border-[#CED4DA] p-2 rounded-md w-full md:w-[20%] lg:w-[11%] relative">
    <img src={statusimg} alt="status" className="w-4 h-4 text-[#7E7E7E]" />
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      onClick={() => setStatusOpen(!isStatusOpen)}
      onBlur={() => setStatusOpen(false)}
      className="px-2 pr-6 appearance-none font-inter font-medium text-[#7E7E7E] text-[0.875rem] outline-none w-full bg-transparent"
    >
      <option value="">Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
    {isStatusOpen ? (
      <FaChevronUp className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
    ) : (
      <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
    )}
  </div>
</div>

  );
};

export default FilterBar;