import api from "../services/api";

const RESULTS = "results/";

export default {
  resultsList() {
    return api().get(RESULTS);
  },

  getResult(body) {
    return api().post(RESULTS, body);
  },

  deleteResult(id) {
    return api().delete(RESULTS + id + "/delete");
  }
};
