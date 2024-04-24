export interface Address {
  label: string;
  city?: string;
}

export interface Place {
  id: string;
  title: string;
  resultType: string;
  address: Address;
  position: Position;
}

export interface Position {
  lat: number;
  lng: number;
}

export const trackPlaceBy = (_: number, item: Place): string => item.id;

export interface Response {
  items: Place[];
}
