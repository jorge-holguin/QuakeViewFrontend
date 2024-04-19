export interface EarthquakeMapProps {
    earthquakes: {
      id: string;
      magnitude: number;
      place: string;
      time: number;
      longitude: number;
      latitude: number;
    }[];
  }