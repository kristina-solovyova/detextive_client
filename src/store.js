import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import axios from "axios";
import VueAxios from "vue-axios";
import jwt_decode from "jwt-decode";
import AuthService from "@/services/AuthService";

Vue.use(VueAxios, axios);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    isAuthenticated: false,
    jwt: localStorage.getItem("token"),
    authErrors: [],
    errors: []
  },
  getters: {
    doneJWT: state => {
      return state.jwt;
    }
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem("token", newToken);
      state.jwt = newToken;
    },

    updateCurrentUser(state) {
      let user = null;

      if (state.jwt) {
        user = jwt_decode(state.jwt);
      }

      state.currentUser = user;
      state.isAuthenticated = !!user;
    },

    removeToken(state) {
      localStorage.removeItem("token");
      state.jwt = null;
    },

    setErrors(state, errors) {
      state.errors = errors;
    },

    setAuthErrors(state, authErrs) {
      state.authErrors = authErrs;
    }
  },
  actions: {
    async obtainToken({ commit, dispatch }, credentials) {
      try {
        const response = await AuthService.getJWTToken(credentials);
        commit("updateToken", response.data.token);
        dispatch("updateAuthData");
        dispatch("redirectToResults");
      } catch (error) {
        commit("setAuthErrors", error.response.data);
      }
    },

    updateAuthData({ commit }) {
      commit("updateCurrentUser");
      commit("setAuthErrors", []); // clear auth errors
    },

    removeToken({ commit, dispatch }) {
      commit("removeToken");
      commit("updateCurrentUser");
      dispatch("redirectToLogin");
    },

    redirectToLogin() {
      router.push({ name: "Login" });
    },

    redirectToResults() {
      router.push({ name: "Results" });
    },

    async refreshToken({ commit, dispatch, state }) {
      try {
        const response = await AuthService.refreshJWTToken({
          token: state.jwt
        });
        commit("updateToken", response.data.token);
        dispatch("updateAuthData");
      } catch (error) {
        dispatch("removeToken");
        commit("setAuthErrors", error.response.data);
      }
    }
  }
});
