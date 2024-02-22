export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  countyCode: string;
  county: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
}

export interface Place {
  id: string;
  title: string;
  resultType: string;
  address: Address;
  position?: Position;
}

export interface Position {
  lat: number;
  lng: number;
}

export const trackPlaceBy = (_: number, item: Place): string => item.id;

export interface Response {
  items: Place[];
}
