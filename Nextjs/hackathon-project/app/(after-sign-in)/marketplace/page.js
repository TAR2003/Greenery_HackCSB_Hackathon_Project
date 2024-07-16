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

  const handleSearch = (filtered) => {
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
                
            
                <SearchBar/>
                
            </div>  
            <hr className={styles.horizontalLine} />
                    <div className='flex flex-row'>      
                        
                        <div className={styles.sidebar}>
                            <Filter />
                        </div>  

                        <div className={styles.productSection}>
                            <ProductGrid products={filteredProducts}/>
                        </div>
                    </div>
        </>
        
    )
}

export default marketplace