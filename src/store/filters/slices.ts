import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "./types";

const initialState: IFilter = {
  id: "all-genres",
  name: "All genres",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    selectFilter(state, action: PayloadAction<IFilter>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { selectFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
