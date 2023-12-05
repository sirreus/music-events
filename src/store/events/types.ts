export interface IDate {
  date: string;
  time: string;
}

export interface ILocation {
  country: string;
  city: string;
  address: string;
}

export interface IImages {
  small: string;
  big: string;
}

export interface ISelectedEventDetails {
  name: string;
  date: string;
  location: string;
  images: string;
}

export interface ISelectedEvent {
  eventId: string;
  isDetailsVisible: boolean;
  cardDetailsPosition: number;
  details: ISelectedEventDetails;
}
