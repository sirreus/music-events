import useSWR from "swr";
import { requestFetcher } from "./requestFetcher";

// API key you can use: 0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq
// API documentation can be found here: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
const MUSIC_EVENTS_URL =
  "https://app.ticketmaster.com/discovery/v2/events?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ";
const EVENT_DETAILS_URL =
  "https://app.ticketmaster.com/discovery/v2/events/<eventId>";
const MUSIC_GENRES_URL =
  "https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ";

const API_BASE_URL = "https://app.ticketmaster.com/discovery/v2";
const API_KEY = "0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq";

const useGetMusicEvents = () =>
  useSWR(
    `${API_BASE_URL}/events?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=${API_KEY}`,
    requestFetcher
  );

const api = {
  getMusicEvents: useGetMusicEvents,
};

export default api;
