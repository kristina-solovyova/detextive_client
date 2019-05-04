<template>
  <mdb-row class="justify-content-md-center">
    <mdb-col col="5">
      <mdb-card class="action-card">
        <mdb-card-body>
          <form>
            <p class="h4 text-center mb-4">Contact us</p>
            <div class="grey-text">
              <mdb-input label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
              <mdb-input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
              <mdb-input label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/>
              <mdb-textarea label="Your message" icon="pencil-alt" :rows="2" />
            </div>
            <div class="text-center">
              <mdb-btn outline="default">
                Send<mdb-icon far icon="paper-plane" class="ml-1" />
              </mdb-btn>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
</template>

<script>
import {
  mdbInput,
  mdbBtn,
  mdbTextarea,
  mdbIcon,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody
} from "mdbvue";

export default {
  name: "Basic",
  components: {
    mdbInput,
    mdbBtn,
    mdbTextarea,
    mdbIcon,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody
  }
};
</script>
