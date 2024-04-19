import React, { useState, useEffect, useCallback } from 'react';
import EarthquakeList from './EarthquakeList';
import EarthquakeMap from './EarthquakeMap';
import { EarthquakeData } from '../interfaces/EarthquakeData';
import './EarthquakeDashboard.css'; 

const EarthquakeDashboard: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState<EarthquakeData[]>([]);
  const [sortType, setSortType] = useState<string>('Largest Magnitude First');
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [magType, setMagType] = useState<string>('');

  const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

  const fetchEarthquakes = useCallback(async () => {
    let url = `${apiUrl}?page=${currentPage}&per_page=${itemsPerPage}`;
    if (magType) {
      url += `&mag_type=${magType}`;
    }
    const response = await fetch(url);
    const data: EarthquakeData[] = await response.json();
    const sortedData = data.sort((a, b) => {
      switch (sortType) {
        case 'Newest First':
          return new Date(b.time).getTime() - new Date(a.time).getTime();
        case 'Oldest First':
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        case 'Largest Magnitude First':
          return b.magnitude - a.magnitude;
        case 'Smallest Magnitude First':
          return a.magnitude - b.magnitude;
        default:
          return 0;
      }
    });
    setEarthquakes(sortedData);
  }, [apiUrl, currentPage, itemsPerPage, magType, sortType]);
  

  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  return (
    <div className="dashboard-container">
      <div className="list-container">
        <EarthquakeList
          earthquakes={earthquakes}
          setSortType={setSortType}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setMagType={setMagType}
        />
        </div>
      <div className="map-container">
        <EarthquakeMap earthquakes={earthquakes} />
      </div>
    </div>
  );
};

export default EarthquakeDashboard;
