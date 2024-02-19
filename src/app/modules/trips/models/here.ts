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
  title: string;
  id: string;
  language: string;
  resultType: string;
  address: Address;
}

export const trackPlaceBy = (_: number, item: Place): string => item.id;

export interface Response {
  items: Place[];
}
