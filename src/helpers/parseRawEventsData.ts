import { IRawImage } from "../store/types";

function parseRawEventsData(data: any) {
  return data.map((rawData: any) => {
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
        small: rawData.images.find((image: IRawImage) => image.ratio === "4_3")
          .url,
        big: rawData.images.find(
          (image: IRawImage) => image.ratio === "3_2" && image.height === 427
        ).url,
      },
    };
  });
}

export default parseRawEventsData;
