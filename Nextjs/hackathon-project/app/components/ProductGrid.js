"use client";
import { useState, useEffect } from 'react';
import styles from './ProductGrid.module.css';
//import styles from './SortBy.module.css';
import SortBy from './SortBy';
const products = [
  { id: 1, image: "productName/Lady Fern.jpg", title: "Item 1", price: "500.00" },
  { id: 2, image: "productName/Juniper.jpg", title: "Item 2", price: "800.00" },
  { id: 3, image: "productName/African Violet.jpg", title: "Item 3", price: "850.00" },
  { id: 4, image: "productName/Pumpkin seeds.jpg", title: "Item 4", price: "200.00" },
  { id: 5, image: "productName/Sunflower seeds.jpg", title: "Item 5", price: "300.00" },
  { id: 6, image: "productName/Cow dung.png", title: "Item 6", price: "300.00" },
  { id: 7, image: "productName/Glyphosate powder.jpg", title: "Item 7", price: "300.00" },
  { id: 8, image: "productName/Compost fertilizer.jpg", title: "Item 8", price: "300.00" },
  { id: 9, image: "productName/Trichlorphon.jpg", title: "Item 9", price: "300.00" },
  { id: 10, image: "productName/Horn meal.png", title: "Item 10", price: "300.00" },
  { id: 11, image: "productName/Hand tool set.jpg", title: "Item 11", price: "300.00" },
  { id: 12, image: "productName/5 piece set.jpg", title: "Item 12", price: "300.00" },
  { id: 13, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 14, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 15, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 16, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 17, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 18, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 19, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 20, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 21, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  { id: 22, image: "productName/Watering can.jpg", title: "Item 13", price: "300.00" },
  
];

const itemsPerPage = 9;

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  //const [searchTerm, setSearchTerm] = useState('');
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (criteria) => {
    let sorted = [...filteredProducts];
    if (criteria === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (criteria === 'name-asc') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === 'name-desc') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    setSortedProducts(sorted);
    setCurrentPage(1); // Reset to the first page after sorting
  };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = products.filter(product =>
//       product.title.toLowerCase().includes(term)
//     );
//     setFilteredProducts(filtered);
//     setSortedProducts(filtered);
//     setCurrentPage(1);
//   };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.productGridContainer}>
      <div className={styles.sortByContainer}>
        <SortBy onSort={handleSort} />
      </div>
      {/* <input
        type="text"
        placeholder="Search product"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      /> */}
      <div className={styles.productGrid}>
        {selectedProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>${product.price}</p>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className={styles.paginationButton}>
            Previous Page
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className={styles.paginationButton}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;