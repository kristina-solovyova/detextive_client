<template>
  <mdb-container class="top">
    <h2 class="h3-responsive font-weight-bold text-center my-5">
      Result #{{ id }}
    </h2>
    <mdb-row class="mt-5">
      <mdb-col lg="5" class="mb-lg-0 mb-5">
        <img :src="imageBaseUrl + result.image_url" alt="Processed image" class="img-fluid rounded z-depth-1" />
      </mdb-col>
      <mdb-col lg="7">
        <mdb-row class="mb-3">
          <mdb-col md="1" size="2">
            <mdb-icon icon="clock" size="2x" class="cyan-text" />
          </mdb-col>
          <mdb-col md="11" size="10">
            <h5 class="font-weight-bold mb-3">Created</h5>
            <p class="grey-text">{{ new Date(result.datetime).toLocaleString() }}</p>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-3">
          <mdb-col md="1" size="2">
            <mdb-icon icon="file-alt" size="2x" class="red-text" />
          </mdb-col>
          <mdb-col md="11" size="10">
            <h5 class="font-weight-bold mb-3">Text found</h5>
            <p class="grey-text">{{ result.text }}</p>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3">
          <mdb-col>
            <mdb-btn @click="goBack" outline="warning"><mdb-icon icon="undo" class="mr-1"/>Back</mdb-btn>
            <mdb-btn @click.native="modal = true" outline="danger">
              <mdb-icon icon="trash" class="mr-1" /> Delete
            </mdb-btn>
            <mdb-modal :show="modal" @close="modal = false">
              <mdb-modal-header>
                <mdb-modal-title>Confirm deletion</mdb-modal-title>
              </mdb-modal-header>
              <mdb-modal-body>Do you really want to delete result #{{ id }}?</mdb-modal-body>
              <mdb-modal-footer>
                <mdb-btn color="warning" @click.native="modal = false">No</mdb-btn>
                <mdb-btn color="danger" @click="deleteResult(id)">Yes</mdb-btn>
              </mdb-modal-footer>
            </mdb-modal>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from "mdbvue";
import ResultsService from "@/services/ResultsService";
export default {
  name: "ResultDetail",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbIcon,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
  },
  props: {
    id: Number
  },
  data() {
    return {
      modal: false,
      imageBaseUrl: process.env.VUE_APP_SERVER_URL,
      result: {
        image_url: "",
        datetime: null,
        text: ""
      }
    };
  },
  methods: {
    async getResult() {
      try {
        const response = await ResultsService.getResult(this.id);
        this.result = response.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteResult(id) {
      try {
        const response = await ResultsService.deleteResult(id);
        this.message = response.data;
        this.goBack();
      } catch (err) {
        console.log(err.message);
      }
    },
    goBack() {
      this.$router.push({ name: "Results" });
    }
  },
  mounted() {
    this.getResult();
  }
};
</script>
