import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedEvent } from "./types";

const initialState: ISelectedEvent = {
  eventId: "",
  isDetailsVisible: false,
  cardDetailsPosition: 0,
  details: {
    name: "",
    date: "",
    location: "",
    images: "",
  },
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setSelectedEventId(state, action: PayloadAction<string>) {
      state.eventId = action.payload;
    },
    removeSelectedEventId(state) {
      state.eventId = "";
    },

    setDetailsVisible(state, action: PayloadAction<boolean>) {
      state.isDetailsVisible = action.payload;
    },

    setCardDetailsPosition(state, action: PayloadAction<number>) {
      state.cardDetailsPosition = action.payload;
    },

    setSelectedEventDetails(
      state,
      action: PayloadAction<ISelectedEvent["details"]>
    ) {
      state.details = action.payload;
    },
    removeSelectedEventDetails(state) {
      state.details = initialState.details;
    },

    removeSelectedEvent(state) {
      state.eventId = initialState.eventId;
      state.isDetailsVisible = initialState.isDetailsVisible;
      state.details = initialState.details;
    },
  },
});

export const {
  setSelectedEventId,
  removeSelectedEventId,
  setDetailsVisible,
  setCardDetailsPosition,
  setSelectedEventDetails,
  removeSelectedEventDetails,
  removeSelectedEvent,
} = eventsSlice.actions;

export default eventsSlice.reducer;
