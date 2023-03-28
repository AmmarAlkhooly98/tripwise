import { combineReducers } from "redux";
import placesReducer from "./places";
import notificationReducer from "./notifications";
import weatherReducer from "./weather";

const reducers = combineReducers({
  place: placesReducer,
  notification: notificationReducer,
  weather: weatherReducer,
});

export default reducers;
