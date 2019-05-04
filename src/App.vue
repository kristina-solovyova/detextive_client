<template>
  <div id="app" class="flyout">
    <mdb-navbar dark color="default" scrolling>
      <!-- purple lighten-1 -->
      <mdb-navbar-brand style="font-weight: bolder;">
        Detextive
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav left>
          <mdb-nav-item waves-fixed>
            <router-link to="/">Home</router-link>
          </mdb-nav-item>
          <mdb-nav-item waves-fixed>
            <router-link to="/features">Features</router-link>
          </mdb-nav-item>
          <mdb-nav-item waves-fixed>
            <router-link to="/contact">Contact us</router-link>
          </mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <mdb-btn @click="login" outline="white" size="sm" class="my-0">Login</mdb-btn>
          <mdb-btn @click="signUp" outline="white" size="sm" class="my-0">Register</mdb-btn>
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
import {
  mdbBtn,
  mdbFooter,
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem
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
    mdbNavItem
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    signUp() {
      this.$router.push({ name: "Register" });
    }
  }
};
</script>

<style lang="less">
.flyout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
</style>
