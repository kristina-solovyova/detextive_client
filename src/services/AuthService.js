import api from "../services/authApi";

export default {
  getJWTToken(params) {
    return api().post("obtain_token", params);
  },

  refreshJWTToken(params) {
    return api().post("refresh_token", params);
  }

  // login(params) {
  //   return api().post("login", params);
  // },
  //
  // logout() {
  //   return api().post("logout");
  // }
};
