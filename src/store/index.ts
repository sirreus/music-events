import { configureStore } from "@reduxjs/toolkit";
import { filtersSlice } from "./filters/slices";

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
