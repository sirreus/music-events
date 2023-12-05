import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { filtersSlice } from "./filters/slices";
import { eventsSlice } from "./events/slices";

const persistConfig = {
  key: "root",
  storage,
};

const persistedFiltersSlice = persistReducer(
  persistConfig,
  filtersSlice.reducer
);

const persistedEventsSlice = persistReducer(persistConfig, eventsSlice.reducer);

export const store = configureStore({
  reducer: {
    filters: persistedFiltersSlice,
    events: persistedEventsSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
