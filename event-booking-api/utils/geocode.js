const axios = require("axios");

exports.getCoordinates = async (location) => {
  console.log("check1")
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: location,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "event-booking-api"
      }
    }
  );
  console.log("res",response)

  if (!response.data || response.data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    latitude: parseFloat(response.data[0].lat),
    longitude: parseFloat(response.data[0].lon)
  };
};