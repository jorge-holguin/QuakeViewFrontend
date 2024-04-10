import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface EarthquakeData {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  longitude: number;
  latitude: number;
}

const EarthquakeMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [earthquakes, setEarthquakes] = useState<EarthquakeData[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (mapRef.current !== null && !mapInstance.current) {
      const initialMap = L.map(mapRef.current).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
      }).addTo(initialMap);

      mapInstance.current = initialMap;
      loadEarthquakeData();
    }

    async function loadEarthquakeData() {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/features');
        const data = await response.json() as EarthquakeData[];
        setEarthquakes(data);

        data.forEach((feature: EarthquakeData) => {
          if (mapInstance.current) {
            L.circleMarker([feature.latitude, feature.longitude], {
              radius: feature.magnitude * 1.5,
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
            })
            .addTo(mapInstance.current)
            .bindPopup(`<h5>${feature.place}</h5><p>Magnitud: ${feature.magnitude}</p><p>${new Date(feature.time).toUTCString()}</p>`);
          }
        });
      } catch (error) {
        console.error('Error fetching earthquake data:', error);
      }
    }
  }, []);

  return (
    <div>
      <div>
        <label>Fecha de inicio:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="form-control shadow" />
        <label>Fecha de finalización:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="form-control shadow" />
        <button className="btn btn-primary mt-4">Mostrar</button>
      </div>
      <div ref={mapRef} style={{ height: '1080px', width: '100%' }} />
    </div>
  );
};

export default EarthquakeMap;
