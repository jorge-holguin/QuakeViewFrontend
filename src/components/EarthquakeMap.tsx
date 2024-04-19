import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './EarthquakeMap.css'; // Asegúrate de importar el CSS aquí
import {EarthquakeMapProps} from '../interfaces/EarthquakeMapProps'; // Verifica que esta ruta sea correcta}

const EarthquakeMap: React.FC<EarthquakeMapProps> = ({ earthquakes }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const initialMap = L.map(mapRef.current, {
        minZoom: 2, // Establece el zoom mínimo para evitar demasiado zoom out
        maxBoundsViscosity: 1.0, // Evita que el usuario panee fuera de los límites iniciales
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)) // Establece los límites para panning
      }).setView([0, 0], 2.5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        noWrap: true // Evita la repetición del mapa
      }).addTo(initialMap);

      mapInstance.current = initialMap;
    }

    // Añadir o actualizar marcadores aquí
    mapInstance.current?.eachLayer(layer => {
      if (layer instanceof L.CircleMarker) {
        layer.remove();
      }
    });

    earthquakes.forEach(earthquake => {
      if (mapInstance.current) {
        L.circleMarker([earthquake.latitude, earthquake.longitude], {
          radius: earthquake.magnitude * 1.5,
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
        }).addTo(mapInstance.current)
          .bindPopup(`<h5>${earthquake.place}</h5><p>Magnitud: ${earthquake.magnitude}</p><p>${new Date(earthquake.time).toLocaleString()}</p>`);
      }
    });
  }, [earthquakes]); // Asegúrate de que la lista de terremotos esté en las dependencias del efecto

  return (
    <div ref={mapRef} className="map-container" />
  );
};

export default EarthquakeMap;
