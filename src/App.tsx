// File: src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import CameraTable from './components/CameraTable';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import type { Camera } from './types/Camera';
import logoimg from "./assets/logo.png";

const API_URL = 'https://api-app-staging.wobot.ai/app/v1/fetch/cameras';
const TOKEN = '4ApVMIn5sTxeW7GQ5VWeWiy';

function App() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [filteredCameras, setFilteredCameras] = useState<Camera[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
   const [loading, setLoading] = useState(true); // <-- added

  useEffect(() => {
    axios.get(API_URL, { headers: { Authorization: `Bearer ${TOKEN}` } }).then((res) => {
      setCameras(res.data.data);
      setFilteredCameras(res.data.data);
       setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let data = [...cameras];
    if (searchTerm) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      data = data.filter((item) => item.status === statusFilter);
    }
    if (locationFilter) {
      data = data.filter((item) => item.location === locationFilter);
    }
    setFilteredCameras(data);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, locationFilter, cameras]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCameras.slice(indexOfFirstItem, indexOfLastItem);

  return (
   <div className="py-6 px-4 md:px-8 bg-[#F9F9F9]">
  <img src={logoimg} alt="" className="w-[40%] md:w-[13%] mx-auto" />

 
      {loading ? (
       <div className="flex justify-center items-center h-[60vh]">
  <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
</div>
      ) : (
        <>
          <div className="space-y-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-3">
                <h1 className="text-base md:text-[1.375rem] text-[#212121] font-medium font-inter">Cameras</h1>
                <p className="font-inter text-[0.75rem] font-normal md:text-[0.875rem] text-[#545454]">Manage your cameras here.</p>
              </div>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <FilterBar
              statusFilter={statusFilter}
              locationFilter={locationFilter}
              setStatusFilter={setStatusFilter}
              setLocationFilter={setLocationFilter}
              cameras={cameras}
            />
          </div>
          <CameraTable
            cameras={currentItems}
            setCameras={setCameras}
            originalCameras={cameras}
          />
          <Pagination
            totalItems={filteredCameras.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        </>
      )}
      </div>
  );
}

export default App;

