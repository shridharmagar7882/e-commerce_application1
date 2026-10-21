import React from 'react';
import Button from '@mui/material/Button';
import { IoIosSearch } from "react-icons/io";

const SearchBox = ({ searchTerm, setSearchTerm, onSearch }) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className='headerSearch ms-3 me-3 d-flex align-items-center position-relative me-auto ms-auto' style={{ maxWidth: '500px', width: '100%' }}>
      <input 
        type='text' 
        className='form-control pe-5' 
        placeholder='Search for products...'
        value={searchTerm || ''}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button 
        onClick={onSearch} 
        className='position-absolute end-0' 
        style={{ minWidth: '40px', height: '100%', color: '#333' }}
      >
        <IoIosSearch size={22} />
      </Button>
    </div>
  );
};

export default SearchBox;