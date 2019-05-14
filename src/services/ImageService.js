import api from "../services/api";
import axios from "axios";

const URL = process.env.VUE_APP_SERVER_URL;

const http = axios.create({
  baseURL: URL + "/api",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + localStorage.getItem("token")
  }
});

export default {
  loadImage(body) {
    return http.post("load-image", body);
  },

  processImage(body) {
    return api().post("process-image", body);
  }
};
