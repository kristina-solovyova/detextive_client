<template>
  <mdb-container>
    <h2 class="h1-responsive font-weight-bold text-center my-5">Welcome to {{ title }}!</h2>
    <p class="text-center w-responsive mx-auto mb-5">
      <mdb-icon icon="flag" class="pr-2" />
      System of text areas localization on images using directional wavelets!
      <mdb-icon icon="flag" class="pl-2" />
    </p>
    <mdb-row>
      <mdb-col lg="7">
        <h3 class="font-weight-bold mb-3 p-0">
          <strong>Localization of arbitrary-oriented text</strong>
        </h3>
        <a class="pink-text">
          <h6 class="font-weight-bold mb-3">
            <mdb-icon icon="lightbulb" class="pr-2" />Based on new algorithm
          </h6>
        </a>
        <p>To localize the text in the image, a method based on the use of two-dimensional continuous wavelet transform is used.
          You can upload image with rotated text without any changes!</p>
      </mdb-col>
      <mdb-col lg="5">
        <mdb-view class="rounded z-depth-2 mb-lg-0 mb-4" hover>
          <img class="img-fluid" src="https://firebase.google.com/docs/ml-kit/images/text_recognition@2x.png" alt="Text extraction" />
          <a>
            <mdb-mask overlay="white-slight" waves/>
          </a>
        </mdb-view>
      </mdb-col>
    </mdb-row>
    <hr class="my-5" />
    <mdb-row>
      <mdb-col lg="5">
        <mdb-view class="rounded mb-lg-0 mb-4" hover>
          <img class="img-fluid" src="https://rietveld-ict.nl/wp-content/uploads/2014/01/users.png" alt="Users image" />
          <a>
            <mdb-mask overlay="white-slight" waves/>
          </a>
        </mdb-view>
      </mdb-col>
      <mdb-col lg="7">
        <h3 class="font-weight-bold mb-3 p-0">
          <strong>New app of this year</strong>
        </h3>
        <a class="deep-purple-text">
          <h6 class="font-weight-bold mb-3">
            <mdb-icon icon="user" class="pr-2" />New users every day</h6>
        </a>
        <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat mdb-iconcere
          possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.</p>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbMask, mdbIcon, mdbView, mdbBtn } from 'mdbvue';
export default {
  name: "BlogPage",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbMask,
    mdbIcon,
    mdbView,
    mdbBtn
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE
    };
  }
};
</script>
