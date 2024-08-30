"use client"
import React from 'react'
import Image from 'next/image'
import styles from './marketplace.module.css'
import SearchBar from '@/app/components/SearchBar'
import Filter from '@/app/components/Filter'
import ProductGrid from '@/app/components/ProductGrid'
import products from '@/app/components/ProductGrid';
import { useState } from 'react'
const marketplace = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [appliedFilters, setAppliedFilters] = useState({});
    const handleSearch = (searchTerm) => {
        const searchLower = searchTerm.toLowerCase();
        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(searchLower)
        );
        setFilteredProducts(filtered);
        setSortedProducts(filtered);
        setCurrentPage(1); // Reset to the first page after searching
      };
  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
    applyFilters(filters);
  };


  const applyFilters = (filters) => {
    let filtered = products;

    if (filters.plants) {
      filtered = filtered.filter(product => product.name === 'plants');
    }
    if (filters.seeds) {
      filtered = filtered.filter(product => product.name === 'seeds');
    }
    if (filters.pesticides) {
      filtered = filtered.filter(product => product.name === 'pesticides');
    }
    if (filters.fertilizers) {
      filtered = filtered.filter(product => product.name === 'fertilizers');
    }
    if (filters.gardeningTools) {
      filtered = filtered.filter(product => product.name === 'gardeningTools');
    }

    setFilteredProducts(filtered);
  };


    return (
        <>
            <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
                <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                    Best marketplace for {' '} 
                    <span className='text-green-300'>
                        Green environment
                    </span>
                    .
                </h1>
                <p className='mt-6 text-lg max-w-prose text-gray-500 text-muted-foreground'>
                    Welcome to Greenary. Every product on out platform is verified by our team to ensure our highest qualily standards.
                </p>
                <br></br>
            
                {/* <SearchBar handleSearch={handleSearch}/> */}
                
            </div>  
            <hr className={styles.horizontalLine} />
                    <div className='flex flex-row'>      
                        <div className={styles.productSection}>
                            <ProductGrid products={filteredProducts}/>
                        </div>
                    </div>
        </>
        
    )
}

export default marketplace