import React from 'react';
import './EarthquakeListItem.css';

// Definimos la interfaz para los props
interface EarthquakeListItemProps {
  earthquake: {
    magnitude: number;
    place: string;
    time: number; // Cambiar según sea necesario para coincidir con el formato de datos
  };
}

// Usamos la interfaz en la definición del componente para tipar los props
const EarthquakeListItem: React.FC<EarthquakeListItemProps> = ({ earthquake }) => {
  return (
    <div className="earthquake-list-item">
      <div className="earthquake-details">
        <div className="earthquake-magnitude">{earthquake.magnitude}</div>
        <div className="earthquake-place">{earthquake.place}</div>
        {/* Convertimos el string de tiempo a una fecha para mostrarla correctamente */}
        <div className="earthquake-time">{new Date(earthquake.time).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default EarthquakeListItem;
