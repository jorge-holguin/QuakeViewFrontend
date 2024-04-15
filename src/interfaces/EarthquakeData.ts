// interfaces/EarthquakeData.ts

export interface EarthquakeData {
    id: string;
    magnitude: number;
    place: string;
    time: number;  // Cambia a 'string' si tu API devuelve una fecha en formato string
    longitude: number;
    latitude: number;
  }
  