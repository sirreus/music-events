export interface IGenres {
  id: string;
  name: string;
}

export interface IDate {
  date: string;
  time: string;
}

export interface ILocation {
  country: string;
  city: string;
  address: string;
}

export interface IRawImage {
  fallback: boolean;
  height: number;
  ratio: string;
  url: string;
  width: number;
}

export interface IEvent {
  id: string;
  name: string;
  genres: IGenres;
  date: string;
  location: ILocation;
  images: string;
}
