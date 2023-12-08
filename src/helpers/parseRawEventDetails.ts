import { IRawImage } from "../store/types";
import moment from "moment";

function parseRawEventDetails(data: any) {
  return data.map((rawData: any) => {
    const { dates, _embedded: location, images } = rawData;

    const dayOfWeek = moment(dates.start.localDate).format("dddd");

    const time = dates.start.localTime
      ? dates.start.localTime.slice(0, -3)
      : moment(dates.access.startDateTime).format("HH:mm");

    const eventDate = `${dayOfWeek}, ${dates.start.localDate} @ ${time}`;

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
