import Vue from "vue";
import Vuex from "vuex";

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
      } catch (error) {
        commit("setAuthErrors", error.response.data);
      }
    },

    updateAuthData({ commit }) {
      commit("updateCurrentUser");
      commit("setAuthErrors", []); // clear auth errors
    },

    removeToken({ commit }) {
      commit("removeToken");
      commit("updateCurrentUser");
    },

    async refreshToken({ commit, dispatch, state }) {
      try {
        const response = await AuthService.refreshJWTToken({
          token: state.jwt
        });
        commit("updateToken", response.data.token);
        dispatch("updateAuthData");
      } catch (error) {
        commit("setAuthErrors", error.response.data);
      }
    },

    inspectToken({ dispatch, state }) {
      if (state.jwt) {
        const decoded = jwt_decode(state.jwt);
        const exp = decoded.exp;
        const orig_iat = decoded.orig_iat;

        if (
          exp - Date.now() / 1000 < 1800 &&
          Date.now() / 1000 - orig_iat < 628200
        ) {
          dispatch("refreshToken");
        } else if (exp - Date.now() / 1000 < 1800) {
          // DO NOTHING, DO NOT REFRESH
        } else {
          // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
          dispatch("removeToken");
        }
      }
    }
  }
});
