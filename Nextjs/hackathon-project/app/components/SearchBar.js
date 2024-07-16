"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './SearchBar.module.css'; // Ensure you create this CSS module
import products from './ProductGrid';
const SearchBar = () => {
  const [search, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setSortedProducts(filtered);
    setCurrentPage(1);
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
        onChange={(e) => handleSearch(e)}
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
