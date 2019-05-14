import api from "../services/api";

export default {
  currentUser() {
    return api().get("user/current");
  },

  newUser(params) {
    return api().post("user/register", params);
  }
};
