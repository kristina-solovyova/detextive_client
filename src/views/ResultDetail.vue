<template>
  <mdb-container class="top">
    <h2 class="h3-responsive font-weight-bold text-center my-5">
      Result #{{ id }}
    </h2>
    <mdb-row class="mt-5">
      <mdb-col lg="5" class="mb-lg-0 mb-5">
        <canvas id="cnv" class="img-fluid rounded z-depth-1"></canvas>
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
            <p ref="resultText" class="font-weight-bold">{{ result.text }}</p>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-5">
          <mdb-col md="1" size="2">
            <mdb-icon icon="copy" size="2x" class="deep-purple-text" />
          </mdb-col>
          <mdb-col md="11" size="10">
            <a><h5 class="font-weight-bold mb-3" @click="copyText">{{ copyMessage }}</h5></a>
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
      result: {
        image_url: "",
        datetime: null,
        text: "",
        text_positions: []
      },
      copied: false
    };
  },
  computed: {
    copyMessage() {
      if (!this.copied) {
        return "Copy to clipboard";
      }
      return "Copied!";
    }
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
    },
    selectText(element) {
      let range;
      if (document.selection) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
    copyText() {
      this.selectText(this.$refs.resultText);
      document.execCommand("copy");
      this.copied = true;
    },
    setCanvas() {
      const canvas = document.getElementById("cnv");
      const context = canvas.getContext("2d");
      const img = new Image();

      img.src = this.result.image_url;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        this.drawBoundingBoxes(context);
      };
    },
    drawBoundingBoxes(ctx) {
      for (let i = 0; i < this.result.text_positions.length; i++) {
        let tp = this.result.text_positions[i];
        ctx.lineWidth = 3;
        ctx.strokeStyle = "lime";
        this.drawRotatedRect(ctx, tp.x, tp.y, tp.width, tp.height, -tp.angle);
        // ctx.beginPath();
        // ctx.moveTo(tp.x, tp.y);
        // ctx.lineTo(tp.x, tp.y + tp.height);
        // ctx.lineTo(tp.x + tp.width, tp.y + tp.height);
        // ctx.lineTo(tp.x + tp.width, tp.y);
        // ctx.closePath();
        // ctx.stroke();
      }
    },
    drawRotatedRect(ctx, x, y, width, height, degrees) {
      // first save the untranslated/unrotated context
      ctx.save();
      ctx.beginPath();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate((degrees * Math.PI) / 180);
      ctx.rect(-width / 2, -height / 2, width, height);
      ctx.stroke();
      ctx.restore();
    }
  },
  async mounted() {
    await this.getResult();
    this.setCanvas();
  }
};
</script>
