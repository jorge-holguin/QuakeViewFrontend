import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const EarthquakeMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Ref para almacenar la instancia del mapa de Leaflet
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      const initialMap = L.map(mapRef.current).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
      }).addTo(initialMap);
      
      mapInstance.current = initialMap;
    }
  }, []);

  const handleShowClick = async () => {
    const apiURL = 'http://127.0.0.1:3000/api/features';
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      
      // Limpiar marcadores existentes antes de añadir nuevos
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          mapInstance.current.removeLayer(layer);
        }
      });

      data.forEach((feature) => {
        const { magnitude, time, place, longitude, latitude } = feature; // Ajusta según la estructura de tu API
        L.circleMarker([latitude, longitude], {
          radius: magnitude * 1.5,
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
        }).addTo(mapInstance.current)
          .bindPopup(`<h5>${place}</h5><p>Magnitud: ${magnitude}</p><p>${new Date(time).toUTCString()}</p>`);
      });
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Fecha de inicio:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control shadow"
        />
        <label>Fecha de finalización:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control shadow"
        />
        <button onClick={handleShowClick} className="btn btn-primary mt-4">Mostrar</button>
      </div>
      <div ref={mapRef} style={{ height: '1080px', width: '100%' }}></div>
    </div>
  );
};

export default EarthquakeMap;
