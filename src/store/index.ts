import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { filtersSlice } from "./filters/slices";

const persistConfig = {
  key: "root",
  storage,
};

const persistedFiltersSlice = persistReducer(
  persistConfig,
  filtersSlice.reducer
);

export const store = configureStore({
  reducer: {
    filters: persistedFiltersSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
