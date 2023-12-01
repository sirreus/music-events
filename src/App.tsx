import React from "react";

import Header from "./components/Header";
import EventsLibrary from "./components/EventsLibrary";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  return (
    <main className="App">
      <Header />
      <EventsLibrary />
      <Footer />
    </main>
  );
}

export default App;
