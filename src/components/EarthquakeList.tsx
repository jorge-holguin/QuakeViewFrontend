import React from 'react';
import EarthquakeListItem from './EarthquakeListItem';
import {EarthquakeListProps} from '../interfaces/EarthquakeListProps'; // Verifica que esta ruta sea correcta}
import './EarthquakeList.css'; 

const EarthquakeList: React.FC<EarthquakeListProps> = ({
  earthquakes,
  setSortType,
  setItemsPerPage,
  setCurrentPage,
  currentPage,
  itemsPerPage,
  setMagType
}) => {
  return (
    <div className="earthquake-list-container">
      <div className="filter-section">
        <div className="sort-filter">
          <label htmlFor="sortType" className="form-label">Sort by:</label>
          <select className="form-select" id="sortType" onChange={(e) => setSortType(e.target.value)}>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
            <option value="Largest Magnitude First">Largest Magnitude First</option>
            <option value="Smallest Magnitude First">Smallest Magnitude First</option>
          </select>
        </div>
        <div className="magnitude-filter">
          <label htmlFor="magnitudeType" className="form-label">Magnitude Type:</label>
          <select className="form-select" id="magnitudeType" onChange={(e) => setMagType(e.target.value)}>
            <option value="">All Types</option>
            <option value="md">md</option>
            <option value="ml">ml</option>
            <option value="ms">ms</option>
            <option value="mw">mw</option>
            <option value="me">me</option>
            <option value="mi">mi</option>
            <option value="mb">mb</option>
            <option value="mlg">mlg</option>
          </select>
        </div>
      </div>
      <div className="items-per-page-section">
        <label htmlFor="itemsPerPage" className="form-label">Items per page:</label>
        <select className="form-select" id="itemsPerPage" onChange={(e) => setItemsPerPage(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      
      <div className="list-group">
        {earthquakes.length > 0 ? (
          earthquakes.map((earthquake) => (
            <EarthquakeListItem key={earthquake.id} earthquake={earthquake} />
          ))
        ) : (
          <p className="text-center">No Data Found</p>
        )}
      </div>
      <div className="pagination-section">
        <button className="btn btn-primary me-2" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage}</span>
        <button className="btn btn-primary ms-2" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default EarthquakeList;
