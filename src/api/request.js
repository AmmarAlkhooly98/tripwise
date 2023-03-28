import axios from "axios";
import store from "../store";
import { toggleNotf } from "../store/actions/notifications";

export const checkHttpStatus = async (response, showNotf) => {
  if (response.status >= 200 && response.status < 300) {
    showNotf && store.dispatch(toggleNotf(response.data));
    return response;
  }

  if (response.status !== 200) {
    showNotf && store.dispatch(toggleNotf(response.data));
    throw new Error(response.statText);
  }
  return response;
};

export const requestApi = async (data, showNotf = true) => {
  return await axios({
    url: data?.url,
    params: data?.params || {},
    method: data?.method || "GET",
    headers: {
      ...data?.headers,
      Accept: data?.accept || "application/json",
      "Content-Type": data?.contentType || "application/json",
    },
  })
    .then((res) => checkHttpStatus(res, showNotf))
    .catch((e) => {
      let { data } = e.response;
      showNotf && store.dispatch(toggleNotf(data || { message: e.message }));
      throw new Error(e);
    });
};
