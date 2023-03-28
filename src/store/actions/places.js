import {
  FETCH_PLACES,
  UPDATE_COORDINATES,
  UPDATE_BOUNDS,
  MAP_CARD_CLICKED,
  FILTER_PLACES,
} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../api/request";

export const fetchPlaces =
  (sw, ne, type = "restaurants") =>
  async (dispatch) => {
    try {
      const data = {
        url: API_URLS(type).PLACES.IN_BOUNDRY,
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_TRIP_ADVISOR_API,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };
      const response = await requestApi(data);
      dispatch({ type: FETCH_PLACES, payload: response?.data?.data });
    } catch (e) {
      console.error(e);
    }
  };

export const updateCoordinates = (coords) => (dispatch) => {
  dispatch({ type: UPDATE_COORDINATES, payload: coords });
};

export const updateBounds = (bounds) => (dispatch) => {
  dispatch({ type: UPDATE_BOUNDS, payload: bounds });
};

export const mapCardClicked = (idx) => (dispatch) => {
  dispatch({ type: MAP_CARD_CLICKED, payload: idx });
};

export const filterPlaces = (places) => async (dispatch) => {
  dispatch({ type: FILTER_PLACES, payload: places });
};
