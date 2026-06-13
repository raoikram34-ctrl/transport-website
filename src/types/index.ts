export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface FleetItem {
  id: string;
  name: string;
  capacity: string;
  range: string;
  class: string;
  features: string[];
}

export interface City {
  name: string;
  state: string;
  lat: number;
  lng: number; // For plotting coordinates
}
