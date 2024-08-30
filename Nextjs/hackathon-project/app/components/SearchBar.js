"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearch(term);   
    handleSearch(term); 
  };

  const handleClear = () => {
    setSearch('');    
    handleSearch(''); 
  };

  return (
    <div className={styles.searchContainer}>
      <Image 
        src="/search.png" 
        alt="Search Icon" 
        width={20} 
        height={20} 
        className={styles.icon}
      />
      <input 
        type="text" 
        placeholder="Search product" 
        value={search}
        onChange={handleInputChange}
        className={styles.input}
      />
      {search && (
        <Image 
          src="/cancel.png" 
          alt="Clear Search" 
          width={20} 
          height={20} 
          className={styles.icon}
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default SearchBar;



