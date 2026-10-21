import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { IoIosSearch } from "react-icons/io";

const SearchBox = ({ 
  onSearch, 
  maxWidth = '450px', // Default maximum width
  height = '42px',    // Default height
  iconSize = 22,      // Default search icon size
  placeholder = 'Search for products...' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        console.log("Searching for:", searchTerm);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div 
      className='headerSearch me-3 d-flex align-items-center position-relative flex-grow-1'
      style={{ maxWidth: maxWidth, height: height }}
    >
      <input 
        type='text' 
        className='form-control pe-5 h-100' 
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ borderRadius: '8px', fontSize: '14px' }}
      />
      <Button 
        onClick={handleSearch} 
        className='position-absolute end-0 me-1 p-0 min-width-auto' 
        style={{ 
          minWidth: '36px', 
          height: '36px', 
          color: '#233a95' 
        }}
      >
        <IoIosSearch size={iconSize} />
      </Button>
    </div>
  );
};

export default SearchBox;