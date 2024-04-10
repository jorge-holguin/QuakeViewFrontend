import React, { useState, useEffect } from 'react';
import EarthquakeListItem from './EarthquakeListItem';

const EarthquakeList = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [sortType, setSortType] = useState('Largest Magnitude First');

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/features')
      .then((response) => response.json())
      .then((data) => {
        sortEarthquakes(data, sortType);
      });
  }, [sortType]);

  const sortEarthquakes = (data, sortType) => {
    let sortedData;
    switch (sortType) {
      case 'Newest First':
        sortedData = [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
        break;
      case 'Oldest First':
        sortedData = [...data].sort((a, b) => new Date(a.time) - new Date(b.time));
        break;
      case 'Largest Magnitude First':
        sortedData = [...data].sort((a, b) => b.magnitude - a.magnitude);
        break;
      case 'Smallest Magnitude First':
        sortedData = [...data].sort((a, b) => a.magnitude - b.magnitude);
        break;
      default:
        sortedData = data;
        break;
    }
    setEarthquakes(sortedData);
  };

  return (
    <div>
      <div>
        <label>Sort by:</label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
          <option value="Largest Magnitude First">Largest Magnitude First</option>
          <option value="Smallest Magnitude First">Smallest Magnitude First</option>
        </select>
      </div>
      <ul>
        {earthquakes.map((earthquake) => (
          <EarthquakeListItem key={earthquake.id} earthquake={earthquake} />
        ))}
      </ul>
    </div>
  );
};

export default EarthquakeList;
