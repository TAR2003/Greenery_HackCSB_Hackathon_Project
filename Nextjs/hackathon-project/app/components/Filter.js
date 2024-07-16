"use client";

import { useState } from 'react';
import styles from './Filter.module.css';

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.filterContainer}>
      <button onClick={toggleFilter} className={styles.filterButton}>
        Filters
      </button>
      {isOpen && (
        <div className={styles.filterPopup}>
          <label>
            <input type="checkbox" name="plants" /> Plants
          </label>
          <label>
            <input type="checkbox" name="seeds" /> Seeds
          </label>
          <label>
            <input type="checkbox" name="pesticides" /> Pesticides
          </label>
          <label>
            <input type="checkbox" name="fertilizers" /> Fertilizers
          </label>
          <label>
            <input type="checkbox" name="gardening-tools" /> Gardening Tools
          </label>
        </div>
      )}
    </div>
  );
};

export default Filter;
