import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { filtersSlice } from "./filters/slices";
import { eventsSlice } from "./events/slices";
import { eventsSearchSlice } from "./search/slices";

const persistConfig = {
  key: "root",
  storage,
};

const persistedFiltersSlice = persistReducer(
  persistConfig,
  filtersSlice.reducer
);

const persistedEventsSlice = persistReducer(persistConfig, eventsSlice.reducer);
const persistedEventsSearchSlice = persistReducer(
  persistConfig,
  eventsSearchSlice.reducer
);

export const store = configureStore({
  reducer: {
    filters: persistedFiltersSlice,
    events: persistedEventsSlice,
    search: persistedEventsSearchSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
