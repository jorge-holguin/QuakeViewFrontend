import React from 'react';
import './App.css';
import EarthquakeDashboard from './components/EarthquakeDashboard';
import logo from './logo.svg';
 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="QuakeWatch Logo" className="App-logo" />
        <h1>QuakeWatch</h1>
      </header>
      <main>
        <EarthquakeDashboard />
      </main>
    </div>
  );
}

export default App;
