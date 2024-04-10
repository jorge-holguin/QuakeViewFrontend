// EarthquakeList.tsx
import React, { useState, useEffect } from 'react';
import EarthquakeListItem from './EarthquakeListItem';

interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number; // Asumiendo que la hora viene como un string desde la API
}

const EarthquakeList = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [sortType, setSortType] = useState<string>('Largest Magnitude First');

  useEffect(() => {
    const fetchEarthquakes = async () => {
      const response = await fetch('http://127.0.0.1:3000/api/features');
      const data = await response.json();
      sortEarthquakes(data as Earthquake[], sortType); // Asegúrate de que la API devuelve un arreglo de Earthquake
    };
    
    fetchEarthquakes();
  }, [sortType]);

  const sortEarthquakes = (data: Earthquake[], sortType: string) => {
    let sortedData = data.sort((a, b) => {
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
        {earthquakes.map(earthquake => (
          <EarthquakeListItem key={earthquake.id} earthquake={earthquake} />
        ))}
      </ul>
    </div>
  );
};

export default EarthquakeList;
