import axios from "axios";

const URL = process.env.VUE_APP_SERVER_URL;

export default () => {
  return axios.create({
    baseURL: URL + "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
};
