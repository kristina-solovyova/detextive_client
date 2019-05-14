<template>
  <mdb-row class="justify-content-md-center">
    <mdb-col col="5">
      <mdb-card class="action-card">
        <mdb-card-body>
          <form @submit.prevent="logIn">
            <p class="h4 text-center mb-4">Sign in</p>
            <div class="grey-text">
              <mdb-input v-model="user.username" label="Your email" icon="envelope" type="text" />
              <mdb-input v-model="user.password" label="Your password" icon="lock" type="password" />
            </div>
            <div class="text-center">
              <mdb-btn type="submit">Login</mdb-btn>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
</template>

<script>
import { mdbRow, mdbCol, mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
export default {
  name: "Login",
  components: {
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      message: "",
      errors: []
    };
  },
  methods: {
    async logIn() {
      await this.$store.dispatch("obtainToken", this.user);
      if (this.$store.state.authErrors.length === 0) {
        this.$router.push("/");
      }
    }
  }
};
</script>
