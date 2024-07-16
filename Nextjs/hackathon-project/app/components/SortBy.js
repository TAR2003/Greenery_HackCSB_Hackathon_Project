import { useState } from 'react';
import styles from './SortBy.module.css';

const SortBy = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSortOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (criteria) => {
    onSort(criteria);
    setIsOpen(false);
  };

  return (
    <div className={styles.sortByContainer}>
      <button onClick={toggleSortOptions} className={styles.sortByButton}>
        Sort By
      </button>
      {isOpen && (
        <div className={styles.sortByOptions}>
          <button onClick={() => handleSort('price-asc')} className={styles.sortByOption}>
            Price (Low to High)
          </button>
          <button onClick={() => handleSort('price-desc')} className={styles.sortByOption}>
            Price (High to Low)
          </button>
          <button onClick={() => handleSort('name-asc')} className={styles.sortByOption}>
            Name (A-Z)
          </button>
          <button onClick={() => handleSort('name-desc')} className={styles.sortByOption}>
            Name (Z-A)
          </button>
        </div>
      )}
    </div>
  );
};

export default SortBy;
