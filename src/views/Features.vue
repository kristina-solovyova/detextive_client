<template>
  <mdb-container>
    <section class="text-center my-5">
      <h2 class="h1-responsive font-weight-bold my-5">Make it easy!</h2>
      <p class="lead grey-text w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
      <mdb-row>
        <mdb-col md="4">
          <mdb-icon icon="image" size="3x" class="red-text"/>
          <h5 class="font-weight-bold my-4">Load image</h5>
          <p class="grey-text mb-md-0 mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </mdb-col>
        <mdb-col md="4">
          <mdb-icon icon="check-circle" size="3x" class="cyan-text"/>
          <h5 class="font-weight-bold my-4">Get result</h5>
          <p class="grey-text mb-md-0 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </mdb-col>
        <mdb-col md="4">
          <mdb-icon far icon="save" size="3x" class="orange-text"/>
          <h5 class="font-weight-bold my-4">Save result to profile</h5>
          <p class="grey-text mb-md-0 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </mdb-col>
      </mdb-row>
    </section>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbIcon } from "mdbvue";
export default {
  name: "Features",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon
  }
};
</script>
