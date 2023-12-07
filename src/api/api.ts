import useSWRImmutable from "swr/immutable";
import { requestFetcher } from "./requestFetcher";

// API key you can use: 0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq
// API documentation can be found here: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
const API_BASE_URL = "https://app.ticketmaster.com/discovery/v2";
const API_KEY = "0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq";

const useGetMusicEvents = () =>
  useSWRImmutable(
    `${API_BASE_URL}/events?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=${API_KEY}`,
    requestFetcher
  );

const useGetEventDetails = (eventId: string) =>
  useSWRImmutable(
    `${API_BASE_URL}/events/${eventId}?apikey=${API_KEY}`,
    requestFetcher
  );

const useGetMusicGenres = () =>
  useSWRImmutable(
    `${API_BASE_URL}/classifications/KZFzniwnSyZfZ7v7nJ?apikey=${API_KEY}`,
    requestFetcher
  );

const api = {
  getMusicEvents: useGetMusicEvents,
  getMusicGenres: useGetMusicGenres,
  getEventDetails: useGetEventDetails,
};

export default api;
