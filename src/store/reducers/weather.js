import { FETCH_WEATHER_DATA } from "../constants";

const initialState = {
  currentWeather: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_DATA:
      return {
        ...state,
        currentWeather: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
