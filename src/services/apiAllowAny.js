import axios from "axios";

const URL = process.env.VUE_APP_SERVER_URL;

let instance = axios.create({
  baseURL: URL + "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default () => {
  return instance;
};
