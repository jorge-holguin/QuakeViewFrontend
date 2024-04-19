export interface EarthquakeListItemProps {
    earthquake: {
      id: string;
      magnitude: number;
      place: string;
      time: number;
      longitude: number;
      latitude: number;
    };
  }
  
