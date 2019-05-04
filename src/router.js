import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Features from "@/views/Features";
import Contact from "@/views/Contact";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/features",
      name: "Features",
      component: Features
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact
    }
  ]
});
