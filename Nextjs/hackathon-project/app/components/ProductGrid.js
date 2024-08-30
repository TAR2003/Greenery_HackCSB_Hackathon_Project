"use client";
import { useState, useEffect } from 'react';
import styles from './ProductGrid.module.css';
//import styles from './SortBy.module.css';
import SortBy from './SortBy';
import Filter from './Filter';
import SearchBar from './SearchBar';
import Link from 'next/link';
const products = [
  { id: 1, image: "productName/Lady Fern.jpg", title: "Lady Fern", price: "500.00" ,name: "plants"},
  { id: 2, image: "productName/Juniper.jpg", title: "Juniper", price: "800.00" ,name:"plants"},
  { id: 3, image: "productName/African Violet.jpg", title: "African Violet", price: "850.00" ,name:"plants"},
  { id: 4, image: "productName/Pumpkin seeds.jpg", title: "Pumpkin seeds", price: "200.00",name:"seeds" },
  { id: 5, image: "productName/Sunflower seeds.jpg", title: "Sunflower seeds", price: "300.00",name:"seeds"},
  { id: 6, image: "productName/Cow dung.png", title: "Cow dung", price: "150.00" ,name:"fertilizers"},
  { id: 7, image: "productName/Glyphosate powder.jpg", title: "Glyphosate powder", price: "350.00" ,name:"pesticides"},
  { id: 8, image: "productName/Compost fertilizer.jpg", title: "Compost fertilizer", price: "200.00",name:"fertilizers" },
  { id: 9, image: "productName/Trichlorphon.jpg", title: "Trichlorphon", price: "400.00",name: "pesticides"},
  { id: 10, image: "productName/Horn meal.png", title: "Horn meal", price: "120.00" ,name:"fertilizers"},
  { id: 11, image: "productName/Hand tool set.jpg", title: "Hand tool set", price: "300.00" ,name:"gardeningTools"},
  { id: 12, image: "productName/5 piece set.jpg", title: "5 piece set", price: "600.00",name: "gardeningTools"},
  { id: 13, image: "productName/Watering can.jpg", title: "Watering can", price: "500.00" ,name:"gardeningTools"},

  
];

const itemsPerPage = 9;

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProducts, setSelectedProducts] = useState([]);
 
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
    setCurrentPage(1);
  };

  // Toggle selection of products
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId); 
      } else {
        return [...prevSelected, productId]; 
      }
    });
  };




  const handleFilter = (filterType) => {
    const filtered = products.filter(product => product.name === filterType);
    setFilteredProducts(filtered);
    setSortedProducts(filtered); 
    setCurrentPage(1); // Reset to page 1 after filtering
  };


  

  // "Proceed to Checkout" or "Add to Cart" button handler
  const handleCheckout = () => {
    const selectedProductDetails = products.filter(product => selectedProducts.includes(product.id));
    
    // Handle checkout logic here, for example, redirect to a checkout page or update a cart.
    console.log("Proceeding to checkout with:", selectedProductDetails);

    // Display a summary or proceed to a checkout page.
    alert("Selected products for checkout:\n" + selectedProductDetails.map(p => `${p.title} - ${p.price}`).join("\n"));


  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProductsForPage = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.productGridContainer}>
      <div className='flex flex-row'>
      <div className={styles.sidebar}>
        
      <Filter handleFilter={handleFilter} />
      </div>
      
      
      <div className={styles.productGrid}>
        {selectedProductsForPage.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>Price: {product.price}</p>

           
            <div className={styles.buyProduct}>
              <button
                 className={selectedProducts.includes(product.id) ? styles.selected : styles.unselected}
                   onClick={() => handleSelectProduct(product.id)}
                   >
                {selectedProducts.includes(product.id) ? 'Buy' : 'Buy'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sortByContainer}>
        <SortBy onSort={handleSort} />
      </div>

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

      {/* Proceed to Checkout or Add to Cart Button */}
      {selectedProducts.length > 0 && (
        <div className={styles.checkoutContainer}>
          <button onClick={handleCheckout} className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;