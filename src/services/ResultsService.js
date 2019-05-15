import api from "../services/api";

const RESULTS = "results/";

export default {
  resultsList() {
    return api().get(RESULTS);
  },

  getResult(id) {
    return api().get(RESULTS + id);
  },

  deleteResult(id) {
    return api().delete(RESULTS + id);
  }
};
