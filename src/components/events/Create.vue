<template>
  <div>
    <div class="steps-container columns is-gapless is-mobile">
      <div class="column is-one-quarter has-text-centered" v-for="(step, index) in steps" :key="index">
        <div class="step" :class="index === 3 ? 'last': ''">
          {{step.name}}
        </div>
      </div>
    </div>
    <div class="container">
      <component :is="activeStep"></component>
    </div>
  </div>
</template>

<script>
import Who from "./create/Who.vue";
import What from "./create/What.vue";
import When from "./create/When.vue";
import Where from "./create/Where.vue";
export default {
  name: "Create",
  components: {
    Who,
    What,
    Where,
    When
  },
  data() {
    return {
      steps: [
        { name: "What", comp: What },
        { name: "When", comp: When },
        { name: "Where", comp: Where },
        { name: "Who", comp: Who }
      ]
    };
  },
  computed: {
    activeStep() {
      return this.$store.getters["event/activeStep"];
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.steps-container {
  margin-top: 16px;
  .step {
    background: $gbgitem;
    padding: 24px;
    border-right: 1px solid rgb(43, 46, 56);
    color: white;
  }
  .last {
    border-right: 0;
  }
}

.step-page {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  .step-header {
    margin-top: 32px;
    flex: 1;
    background: $gbgheader;
    border-left: 3px solid $gprimary;
    border-radius: 2px;
    padding: 8px;
    .step-title {
      padding: 16px;
      padding-bottom: 0px;
      font-size: 24px;
      text-transform: uppercase;
      color: $gprimarylight;
      letter-spacing: 1.3px;
    }
    .step-subtitle {
      color: lightgray;
      font-size: 24px;
    }
  }
  .step-form {
    padding: 24px 8px 0px 8px;

    // border: 1px solid $gborder;
    label {
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 1.1px;
      padding-left: 2px;
      color: $glabel;
    }
    input {
      background: $gbginput;
      border: 1px solid $gborder;
      outline: none;
      color: white;
      border-radius: 3px;
      font-size: 18px;
    }
    textarea {
      background: $gbginput;
      border: 1px solid $gborder;
      outline: none;
      color: white;
      border-radius: 3px;
      font-size: 18px;
    }
  }
  .next-step {
    background: $gprimary;
    color: white;
    border: 0px;
    border-radius: 3px;
    font-size: 18px;
    width: 30%;
    margin-top: 16px;
    // font-weight: bold;
    letter-spacing: 1.7px;
  }
}
</style>