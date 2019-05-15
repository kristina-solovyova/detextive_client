import axios from "axios";
import store from "@/store";

const URL = process.env.VUE_APP_SERVER_URL;

let instance = axios.create({
  baseURL: URL + "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error.message);

    if (store.getters.getJWT) {
      store.dispatch("refreshToken");
    } else {
      store.dispatch("redirectToLogin");
    }
  }
);

export default () => {
  return instance;
};
