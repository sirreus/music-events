import { IRawImage } from "../store/types";

function parseRawEventDetails(data: any) {
  return data.map((rawData: any) => {
    const { dates, _embedded: location, images } = rawData;

    const eventDate = `${dates.start.localDate} ${
      dates.start.localTime ||
      dates.access.startDateTime.split("T")[1].split("Z")[0]
    }`;

    const eventLocation = `${location?.venues[0].address.line1}, ${location?.venues[0].city.name}, ${location?.venues[0].country.name}`;
    const eventImage = images.find(
      (image: IRawImage) => image.ratio === "3_2" && image.height === 427
    ).url;

    return {
      id: rawData.id,
      name: rawData.name,
      date: eventDate,
      location: eventLocation,
      images: eventImage,
    };
  });
}

export default parseRawEventDetails;
