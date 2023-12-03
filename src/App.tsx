import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

import { MainPage } from "./pages/Main";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainPage />
      </PersistGate>
    </Provider>
  );
}

export default App;
