import { IEvent, IRawImage } from "../store/types";

function parseRawEventsData(data: any): IEvent[] {
  return data.map((rawData: any) => {
    const { dates, _embedded: location, images } = rawData;

    const eventDate = `${dates.start.localDate} ${
      dates.start.localTime ||
      dates.access.startDateTime.split("T")[1].split("Z")[0]
    }`;

    const eventImage = images.find(
      (image: IRawImage) => image.ratio === "4_3"
    ).url;

    return {
      id: rawData.id,
      name: rawData.name,
      genres: rawData.classifications[0].genre,
      date: eventDate,
      location: {
        country: location.venues[0].country.name,
        city: location.venues[0].city.name,
        address: location.venues[0].address.line1,
      },
      images: eventImage,
    };
  });
}

export default parseRawEventsData;
