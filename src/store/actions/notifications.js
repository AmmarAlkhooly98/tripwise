import { TOGGLE_NOTIFICATION, TOGGLE_NOTIFICATION_OFF } from "../constants";

export const toggleNotf = (data) => async (dispatch) => {
  dispatch({ type: TOGGLE_NOTIFICATION, payload: data });
};

export const toggleNotfOff = () => async (dispatch) => {
  dispatch({ type: TOGGLE_NOTIFICATION_OFF });
};
