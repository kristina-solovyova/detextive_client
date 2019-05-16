<template>
  <mdb-row class="justify-content-md-center">
    <mdb-col col="5">
      <mdb-card class="action-card">
        <mdb-card-body>
          <form novalidate @submit.prevent="sendForm">
            <p class="h4 text-center mb-4">Contact us</p>
            <div class="grey-text">
              <mdb-input
                v-model="form.name"
                label="Your name"
                icon="user"
                type="text"
                :maxlength="255"
                validate
                required
                invalidFeedback="What's your name?"
              />
              <mdb-input
                v-model="form.email"
                label="Your email"
                icon="envelope"
                type="email"
                validate
                required
                invalidFeedback="Please enter correct email"
              />
              <mdb-input
                v-model="form.subject"
                label="Subject"
                icon="tag"
                type="text"
                :maxlength="255"
                required
                validate
                invalidFeedback="Please provide us with the subject"
              />
              <mdb-input
                v-model="form.message"
                label="Your message"
                icon="pencil-alt"
                type="textarea"
                :rows="2"
                required
                validate
                invalidFeedback="Do you have nothing to say? :("
                validFeedback="Thank's for your message!"
              />
            </div>
            <div class="text-center">
              <mdb-btn outline="default" type="submit">
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
  mdbIcon,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody
} from "mdbvue";
import ContactUsService from "@/services/ContactUsService";

export default {
  name: "Contact",
  components: {
    mdbInput,
    mdbBtn,
    mdbIcon,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      message: ""
    };
  },
  methods: {
    async sendForm(event) {
      this.checkForm(event);
      try {
        await ContactUsService.sendContactUsForm(this.form);
        this.$router.push({ name: "Home" });
      } catch (err) {
        console.log(err.message);
      }
    },
    checkForm(event) {
      event.target.classList.add("was-validated");
    }
  }
};
</script>
