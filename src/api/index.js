const API_URLS = (extraData) => ({
  // the extraData can be used to send url params and request query data if needed to api.
  PLACES: {
    IN_BOUNDRY: `https://travel-advisor.p.rapidapi.com/${extraData}/list-in-boundary`,
  },
  WEATHER: {
    CURRENT: `https://open-weather13.p.rapidapi.com/city/latlon/${extraData?.lat}/${extraData?.lng}`,
  },
});

export default API_URLS;
