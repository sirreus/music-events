import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedEvent } from "./types";
import { IEvent } from "../types";

interface IEventsStore {
  eventsData: IEvent[];
  selectedEvent: ISelectedEvent;
}

const initialState: IEventsStore = {
  eventsData: [
    {
      id: "",
      name: "",
      genres: {
        id: "",
        name: "",
      },
      date: {
        date: "",
        time: "",
      },
      location: {
        country: "",
        city: "",
        address: "",
      },
      images: {
        small: "",
        big: "",
      },
    },
  ],
  selectedEvent: {
    eventId: "",
    isDetailsVisible: false,
    cardDetailsPosition: 0,
    details: {
      name: "",
      date: "",
      location: "",
      images: "",
    },
  },
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<IEvent[]>) {
      state.eventsData = action.payload;
    },

    setSelectedEventId(state, action: PayloadAction<string>) {
      state.selectedEvent.eventId = action.payload;
    },
    removeSelectedEventId(state) {
      state.selectedEvent.eventId = "";
    },

    setDetailsVisible(state, action: PayloadAction<boolean>) {
      state.selectedEvent.isDetailsVisible = action.payload;
    },

    setCardDetailsPosition(state, action: PayloadAction<number>) {
      state.selectedEvent.cardDetailsPosition = action.payload;
    },

    setSelectedEventDetails(
      state,
      action: PayloadAction<ISelectedEvent["details"]>
    ) {
      state.selectedEvent.details = action.payload;
    },
    removeSelectedEventDetails(state) {
      state.selectedEvent.details = initialState.selectedEvent.details;
    },

    removeSelectedEvent(state) {
      state.selectedEvent.eventId = initialState.selectedEvent.eventId;
      state.selectedEvent.isDetailsVisible =
        initialState.selectedEvent.isDetailsVisible;
      state.selectedEvent.details = initialState.selectedEvent.details;
    },
  },
});

export const {
  setEvents,
  setSelectedEventId,
  removeSelectedEventId,
  setDetailsVisible,
  setCardDetailsPosition,
  setSelectedEventDetails,
  removeSelectedEventDetails,
  removeSelectedEvent,
} = eventsSlice.actions;

export default eventsSlice.reducer;
