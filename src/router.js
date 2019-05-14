import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Features from "@/views/Features";
import Contact from "@/views/Contact";
import Results from "@/views/Results";
import ResultDetail from "@/views/ResultDetail";
import LoadImage from "@/views/LoadImage";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      alias: "/home"
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
    },
    {
      path: "/results",
      name: "Results",
      component: Results
    },
    {
      path: "/results/:id",
      name: "ResultDetail",
      component: ResultDetail,
      props: true
    },
    {
      path: "/load-image",
      name: "LoadImage",
      component: LoadImage,
      alias: "/load"
    }
  ]
});
