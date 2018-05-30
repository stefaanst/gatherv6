<template>
  <div class="container step-page">
    <div class="step-header has-text-centered">
      <div class="step-title">
        EVENT DATE
      </div>
      <div class="step-subtitle">
        When is it going down?
      </div>
    </div>
    <div class="columns step-form">
      <div class="column is-half is-offset-1">
        <DatePicker multi="true" v-model="suggestedDates" />
      </div>
      <div class="column">
        <div class="selected-dates">
          <div class="selected-dates-header">
            <div class="header-title has-text-centered">
              SELECTED DATES
            </div>
          </div>
          <transition-group name="fade" mode="out-in">
            <div class="selected-container" v-for="date in orderedDates" :key="date">
              <div class="selected-date has-text-centered">
                {{date | longdate}}
              </div>
              <span class="button-remove-date" @click="removeDate(date)">
                X
              </span>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="has-text-centered">
      <button class="button next-step" @click="goWhere">Next</button>
    </div>
  </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
export default {
  name: "When",
  components: {
    DatePicker
  },
  data() {
    return {
      suggestedDates: []
    };
  },
  methods: {
    goWhere() {
      this.$store.commit("event/SET_WHEN", this.suggestedDates);
      this.$store.commit("event/SET_ACTIVE_STEP", "Where");
    },
    removeDate(d) {
      let datesUnix = this.suggestedDates.map(date => {
        return date.getTime();
      });
      let index = datesUnix.findIndex(date => date === d);
      this.suggestedDates.splice(index, 1);
    }
  },
  computed: {
    orderedDates() {
      let mapped = this.suggestedDates.map(date => {
        return date.getTime();
      });
      let sorted = mapped.sort((a, b) => {
        return a > b;
      });
      return sorted;
    }
  }
};
</script>

<style lang="scss" scoped>
.selected-dates {
  min-height: 200px;
  .selected-dates-header {
    background: $gbgheader;
    border-radius: 2px;
    padding: 8px;
    .header-title {
      font-size: 24px;
      color: white;
    }
  }

  .selected-container {
    color: white;
    display: flex;
    .selected-date {
      font-size: 16px;
      padding: 8px;
      background: $gbgitem;
      margin-top: 2px;
      flex: 1;
    }
    .button-remove-date {
      color: pink;
      padding: 8px;
      padding-left: 16px;
      background: $gbgheader;
      border-radius: 3px;
      margin-top: 2px;
      font-size: 18px;
      width: 8%;
      &:hover {
        background: darken(pink, 3%);
        cursor: pointer;
        color: white;
        border-radius: 3px;
      }
    }
  }
}
</style>