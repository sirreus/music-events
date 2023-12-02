import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { IEvent, IRawImage } from "./store/types";
import { store } from "./store";

import api from "./api";

import Header from "./components/Header";
import EventsLibrary from "./components/EventsLibrary";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  const { data } = api.getMusicEvents();

  const [events, setEvents] = useState<IEvent[] | undefined>(undefined);

  useEffect(() => {
    if (data) {
      const eventsRawData = data._embedded.events;

      const cleanData: IEvent[] = eventsRawData.map((rawData: any) => {
        return {
          id: rawData.id,
          name: rawData.name,
          genres: rawData.classifications[0].genre,
          date: {
            date: rawData.dates.start.localDate,
            time:
              rawData.dates.start.localTime ||
              rawData.dates.access.startDateTime.split("T")[1].split("Z")[0],
          },
          location: {
            country: rawData._embedded.venues[0].country.name,
            city: rawData._embedded.venues[0].city.name,
            address: rawData._embedded.venues[0].address.line1,
          },
          images: {
            small: rawData.images.find(
              (image: IRawImage) => image.ratio === "4_3"
            ).url,
            big: rawData.images.find(
              (image: IRawImage) =>
                image.ratio === "3_2" && image.height === 427
            ).url,
          },
        };
      });

      // console.log(cleanData);
      setEvents(cleanData);
    }
  }, [data]);

  return (
    <Provider store={store}>
      <main className="App">
        <Header />
        <EventsLibrary events={events} />
        <Footer />
      </main>
    </Provider>
  );
}

export default App;
