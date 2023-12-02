import React from "react";
import { Provider } from "react-redux";

import { store } from "./store";

import { MainPage } from "./pages/Main";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
