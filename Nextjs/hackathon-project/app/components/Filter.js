"use client";

import styles from './Filter.module.css';

const Filter = ({ handleFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <button className={styles.filterButton}>Filters</button>
      <div className={styles.filterPopup}>
        <label>
          <input type="checkbox" onClick={() => handleFilter('plants')} />
          Plants
        </label>
        <label>
          <input type="checkbox" onClick={() => handleFilter('seeds')} />
          Seeds
        </label>
        <label>
          <input type="checkbox" onClick={() => handleFilter('pesticides')} />
          Pesticides
        </label>
        <label>
          <input type="checkbox" onClick={() => handleFilter('fertilizers')} />
          Fertilizers
        </label>
        <label>
          <input type="checkbox" onClick={() => handleFilter('gardeningTools')} />
          Gardening Tools
        </label>
      </div>
    </div>
  );
};

export default Filter;


