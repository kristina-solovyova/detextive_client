<template>
  <mdb-container>
    <mdb-row>
      <mdb-col md="5">
        <div class="d-flex justify-content-around align-items-center my-2">
          <h4><strong>Load image</strong></h4>
          <mdb-btn @click="processImage" v-show="image" outline="default">
            <mdb-icon icon="magic" class="mr-1" /> Process
          </mdb-btn>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="5">
        <picture-input
          ref="pictureInput"
          width="450"
          height="450"
          :crop="false"
          margin="0"
          accept="image/jpeg,image/png"
          size="10"
          button-class="btn btn-sm"
          :custom-strings="{
            upload: '<p>Your device does not support file uploading.</p>',
            drag: 'Drag an image or click <br> here 🔍 to select a file'
          }"
          @change="onChange"
          @error="onError">
        </picture-input>
      </mdb-col>
      <mdb-col md="2" class="d-flex justify-content-around align-items-center">
        <mdb-icon icon="arrow-right" size="3x" class="grey-text"/>
      </mdb-col>
      <mdb-col md="5">
        <div class="processed">
          <div class="processed-content">
            <div>
              <clip-loader v-if="processing" class="into" name="spinner" size="70px"></clip-loader>
              <span class="into" v-else-if="result">{{ result.text }}</span>
            </div>
          </div>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon } from "mdbvue";
import PictureInput from "vue-picture-input";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import ImageService from "@/services/ImageService";
export default {
  name: "LoadImage",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbIcon,
    PictureInput,
    ClipLoader
  },
  data() {
    return {
      image: null,
      processing: false,
      result: null,
      errors: [],
      loaded: null
    };
  },
  methods: {
    async loadImage() {
      this.processing = true;
      const formData = new FormData();
      formData.append("img", this.image);

      try {
        const response = await ImageService.loadImage(formData);
        this.loaded = response.data;
      } catch (error) {
        this.errors = error.response.data;
      } finally {
        this.processing = false;
      }
    },
    async processImage() {
      await this.loadImage();
      if (this.loaded == null) {
        this.errors.push("Can't load image");
        return;
      }

      try {
        const response = await ImageService.processImage({
          image_id: this.loaded.id
        });
        this.result = response.data;
      } catch (err) {
        this.errors = err.response.data;
      }
    },
    onChange() {
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        this.errors.push("Old browser. No support for Filereader API");
      }
    },
    onError() {
      this.errors.push("Can not upload an image");
    }
  }
};
</script>

<style scoped lang="less">
@result-block-size: 450px;

.processed {
  max-width: @result-block-size;
  max-height: @result-block-size;
  width: 100%;
  position: relative;
  border: 3px solid rgba(174, 174, 174, 0.5);
}
.processed:after {
  content: "";
  display: block;
  padding-top: 100%;
}
.processed-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.processed-content div {
  display: table;
  width: 100%;
  height: 100%;
}
.processed-content .into {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
