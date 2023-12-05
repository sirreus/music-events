import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../types";

interface IEventsSearch {
  searchValue: string;
  searchResults: IEvent[] | [];
}

const initialState: IEventsSearch = {
  searchValue: "",
  searchResults: [],
};

export const eventsSearchSlice = createSlice({
  name: "eventsSearch",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    removeSearchValue(state) {
      state.searchValue = "";
    },

    setSearchResults(state, action: PayloadAction<IEvent[] | []>) {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchValue, removeSearchValue, setSearchResults } =
  eventsSearchSlice.actions;

export default eventsSearchSlice.reducer;
