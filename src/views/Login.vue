<template>
  <mdb-row class="justify-content-md-center">
    <mdb-col col="5">
      <mdb-card class="action-card">
        <mdb-card-body>
          <form>
            <p class="h4 text-center mb-4">Sign in</p>
            <div class="grey-text">
              <mdb-input label="Your email" icon="envelope" type="email" />
              <mdb-input label="Your password" icon="lock" type="password" />
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
  }
};
</script>
