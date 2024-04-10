import React from 'react';
import './App.css';
import EarthquakeMap from './components/EarthquakeMap';
import EarthquakeList from './components/EarthquakeList';

function App() {
  return (
    <div className="App">
      <header>
        {/* Si necesitas algún contenido en el encabezado, añádelo aquí */}
      </header>
      <main className="Main-content">
        <section className="Sidebar">
          <EarthquakeList />
        </section>
        <section className="MapArea">
          <EarthquakeMap />
        </section>
      </main>
    </div>
  );
}

export default App;
