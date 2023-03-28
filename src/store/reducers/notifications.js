import { TOGGLE_NOTIFICATION, TOGGLE_NOTIFICATION_OFF } from "../constants";

const initialState = {
  message: "",
  open: false,
  variant: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        message: action.payload?.data?.length
          ? "success"
          : action.payload?.message || "oops something went wrong...",
        variant: action.payload?.data?.length ? "success" : "error",
        open: true,
      };
    case TOGGLE_NOTIFICATION_OFF:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
