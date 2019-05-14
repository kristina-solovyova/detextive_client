<template>
  <div id="app" class="flyout">
    <mdb-navbar dark color="default" scrolling>
      <!-- purple lighten-1 -->
      <mdb-navbar-brand class="bolder" to="/">
        <img :src="require('@/assets/images/logo.png')" class="logo" height="35" alt="" />
        {{ title }}
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav left v-show="!isAuthenticated">
          <mdb-nav-item exact waves-fixed to="/">Home</mdb-nav-item>
          <mdb-nav-item waves-fixed to="/features">Features</mdb-nav-item>
          <mdb-nav-item waves-fixed to="/contact">Contact us</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav left v-show="isAuthenticated">
          <mdb-nav-item waves-fixed to="/load-image">Load image</mdb-nav-item>
          <mdb-nav-item waves-fixed to="/results">My results</mdb-nav-item>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="stylish" slot="toggle" waves-fixed>Info</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item to="/features">Features</mdb-dropdown-item>
              <mdb-dropdown-item to="/contact">Contact us</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <mdb-nav-item waves-fixed class="bolder" v-show="isAuthenticated" to="/me">
            {{ currentUser == null ? "My profile" : currentUser.username }}
          </mdb-nav-item>
          <mdb-btn @click="login" v-show="!isAuthenticated" outline="white" size="sm" class="my-0">Login</mdb-btn>
          <mdb-btn @click="signUp" v-show="!isAuthenticated" outline="white" size="sm" class="my-0">Register</mdb-btn>
          <mdb-btn @click="logout" v-show="isAuthenticated" outline="white" size="sm" class="my-0">Logout</mdb-btn>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>

    <main>
      <router-view />
    </main>

    <mdb-footer color="teal lighten-2" class="font-small">
      <div class="text-center py-sm-3">
        &copy; {{ new Date().getFullYear() }} Copyright:
        <a> Kristina Solovyova </a>
      </div>
    </mdb-footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  mdbBtn,
  mdbFooter,
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbDropdown,
  mdbDropdownToggle,
  mdbDropdownMenu,
  mdbDropdownItem
} from "mdbvue";

export default {
  name: "App",
  components: {
    mdbBtn,
    mdbFooter,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE
    };
  },
  computed: mapState(["currentUser", "isAuthenticated"]),
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    signUp() {
      this.$router.push({ name: "Register" });
    },
    async logout() {
      await this.$store.dispatch("removeToken");
      this.$router.push({ name: "Home" });
    }
  },
  async created() {
    await this.$store.dispatch("updateAuthData");
  }
};
</script>
