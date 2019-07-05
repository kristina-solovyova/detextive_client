import api from "../services/api";
import axios from "axios";

const URL = process.env.VUE_APP_SERVER_URL;

const http = axios.create({
  baseURL: URL + "/api",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

http.interceptors.request.use(
  config => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  loadImage(body) {
    return http.post("load-image", body);
  },

  processImage(body) {
    return api().post("process-image", body);
  },

  getProgress(task_id) {
    return api().get("get-progress", {
      params: { task_id }
    });
  }
};
