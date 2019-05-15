<template>
  <mdb-row class="justify-content-md-center">
    <mdb-col col="5">
      <mdb-card class="action-card">
        <mdb-card-body>
          <form @submit.prevent="register">
            <p class="h4 text-center py-4">Sign up</p>
            <div class="grey-text">
              <mdb-input v-model="user.username" label="Your username" icon="user" group type="text" validate error="wrong" success="right"/>
              <mdb-input v-model="user.email" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
              <mdb-input v-model="user.password" label="Your password" icon="lock" group type="password" validate/>
            </div>
            <div class="text-center py-4 mt-3">
              <mdb-btn type="submit">Register</mdb-btn>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
</template>

<script>
import { mdbRow, mdbCol, mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import UserService from "@/services/UserService";
export default {
  name: "Register",
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
        email: "",
        password: ""
      },
      message: "",
      errors: []
    };
  },
  methods: {
    async register() {
      try {
        const response = await UserService.newUser(this.user);
        this.message = response.data;
        await this.$store.dispatch("redirectToLogin");
      } catch (err) {
        this.errors = err.response;
      }
    }
  }
};
</script>
