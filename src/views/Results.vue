<template>
  <mdb-container class="top">
    <mdb-row class="mt-4 align-items-center justify-content-start">
      <h4><strong>My processing results</strong></h4>
    </mdb-row>
    <hr class="mb-5" />
    <mdb-row>
      <p v-show="!results.length">No results yet, try to load image.</p>
      <div class="card-deck">
        <div class="card result-card" v-for="(result, index) in results" :key="index" @click="viewResult(result.id)">
          <img :src="result.image_url" class="card-img-top result-image" alt="Processed image">
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
      results: []
    };
  },
  methods: {
    async getResults() {
      try {
        const response = await ResultsService.resultsList();
        this.results = response.data.results;
      } catch (err) {
        console.log(err.message);
      }
    },
    viewResult(id) {
      this.$router.push({ name: "ResultDetail", params: { id } });
    }
  },
  mounted() {
    this.getResults();
  }
};
</script>
