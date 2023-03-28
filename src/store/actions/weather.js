import API_URLS from "../../api";
import { requestApi } from "../../api/request";
import { FETCH_WEATHER_DATA } from "../constants";

export const fetchWheaterData = (coords) => async (dispatch) => {
  try {
    const data = {
      url: API_URLS(coords).WEATHER.CURRENT,
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_OPEN_WEATHER_API,
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };
    const response = await requestApi(data, false);
    dispatch({ type: FETCH_WEATHER_DATA, payload: response?.data });
  } catch (e) {
    console.error(e);
  }
};
