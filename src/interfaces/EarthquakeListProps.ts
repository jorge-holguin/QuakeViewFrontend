// src/interfaces/EarthquakeListProps.ts

import { EarthquakeData } from './EarthquakeData'; // Asegúrate de que la ruta a EarthquakeData sea correcta

export interface EarthquakeListProps {
  earthquakes: EarthquakeData[];
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  itemsPerPage: number;
  setMagType: React.Dispatch<React.SetStateAction<string>>;
}
