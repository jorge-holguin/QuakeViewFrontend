import React from 'react';
import './EarthquakeListItem.css'; // Asegúrate de tener este archivo en tu proyecto

const EarthquakeListItem = ({ earthquake }) => {
  return (
    <div className="earthquake-list-item">
      <div className="earthquake-details">
        <div className="earthquake-magnitude">{earthquake.magnitude}</div>
        <div className="earthquake-place">{earthquake.place}</div>
        <div className="earthquake-time">{new Date(earthquake.time).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default EarthquakeListItem;
