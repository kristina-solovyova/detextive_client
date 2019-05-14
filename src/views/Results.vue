<template>
  <mdb-container class="top">
    <mdb-row class="mt-4 align-items-center justify-content-start">
      <h4><strong>My processing results</strong></h4>
    </mdb-row>
    <hr class="mb-5" />
    <mdb-row>
      <div class="card-deck">
        <div class="card result-card" v-for="(result, index) in results" :key="index">
          <img :src="imageBaseUrl + result.image_url" class="card-img-top result-image" alt="Processed image">
          <div class="card-body">
            <p class="card-text result-text">{{ result.text }}</p>
            <p class="card-text"><small class="text-muted">{{ new Date(result.datetime).toLocaleString() }}</small></p>
          </div>
        </div>
      </div>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow } from "mdbvue";
import ResultsService from "@/services/ResultsService";
export default {
  name: "Results",
  components: {
    mdbContainer,
    mdbRow
  },
  data() {
    return {
      imageBaseUrl: process.env.VUE_APP_SERVER_URL,
      results: []
    };
  },
  methods: {
    async getResults() {
      const response = await ResultsService.resultsList();
      this.results = response.data.results;
    },
    viewResult(id) {
      this.$router.push({ name: "ResultDetail", params: { id } });
    },
    async deleteResult(id, index) {
      const response = await ResultsService.deleteResult(id);
      this.message = response.data.message;
      this.results.splice(index, 1);
    }
  },
  mounted() {
    this.getResults();
  }
};
</script>
