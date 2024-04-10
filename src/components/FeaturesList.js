import React, { useEffect, useState } from 'react';

function FeaturesList() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/features')
      .then(response => response.json())
      .then(data => setFeatures(data)) // Cambiado de data.data a data
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Datos Sismológicos</h1>
      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            <h2>{feature.title}</h2> {/* Acceso directo a la propiedad title */}
            <p>Magnitud: {feature.magnitude}</p> {/* Acceso directo a la propiedad magnitude */}
            <p>Lugar: {feature.place}</p> {/* Acceso directo a la propiedad place */}
            {/* Añade más detalles según necesites */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeaturesList;
