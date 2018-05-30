<template>
  <div class="date-decider">
    <div class="columns is-mobile ">
      <div class="column is-2">
      </div>
      <div class="column is-1 header-date has-text-centered" v-for="(date, index) in dates" :key="index">
        {{date | deciderdate }}
      </div>
    </div>
    <div class="columns is-mobile" v-for="(pa, x) in participants" :key="x">
      <div class="column is-2  pa-column" :class="pa === user.id ? 'has-text-weight-bold' : ''">
        <Participant :id="pa" class="pa" />
      </div>
      <div class="column is-1 option" v-for="(option, index) in options" :key="index" :class="check(option, pa) ? 'available' : 'unavailable'" @click="toggle(option, pa, index)"> </div>
    </div>
    <!-- <button class="button" @click="submit">submit</button> -->
  </div>
</template>

<script>
import moment from "moment";
import Participant from "./Participant.vue";
import { db } from "../../../firebase_config";
export default {
  name: "DateDecider",
  components: {
    Participant
  },
  data() {
    return {
      dates: [],
      formattedDates: [],
      options: {}
    };
  },

  methods: {
    check(option, pa) {
      return option.hasOwnProperty(pa);
    },
    toggle(option, pa, index) {
      if (pa !== this.user.id) {
        return;
      }
      if (this.check(option, pa)) {
        this.$delete(this.options[index], pa);
      } else {
        this.$set(this.options[index], pa, true);
      }
    },
    submit() {
      db
        .collection("events")
        .doc(this.id)
        .update({ options: this.options })
        .catch(e => {
          console.log(e);
        });
    }
    // addDate() {
    //   console.log(this.options);
    //   let newOptions = {};
    //   this.formattedDates.forEach(date => {
    //     if (this.options.hasOwnProperty(date.getTime().toString())) {
    //       return;
    //     }
    //     console.log(this.options);
    //     newOptions = { ...newOptions, [date.getTime().toString()]: {} };
    //   });

    //   Object.keys(newOptions).forEach(d => {
    //     this.$set(this.options, d, { [this.user.id]: true });
    //   });
    // }
  },
  computed: {
    event() {
      return this.$store.getters["event/events"].find(e => e.id === this.id);
    },
    participants() {
      return Object.keys(this.event.participants);
    },
    user() {
      return this.$store.getters["user/user"];
    }
  },
  props: ["id"],
  watch: {
    options() {
      this.dates = Object.keys(this.options);
    }
  },
  mounted() {
    db
      .collection("events")
      .doc(this.id)
      .onSnapshot(snap => {
        this.options = snap.data().options;
        this.formattedDates = this.dates.map(date => {
          return moment(+date).toDate();
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.date-decider {
  width: 80%;
}
.available {
  background-color: $gprimary;
  color: white;
}
.unavailable {
  background-color: #6d676894;
  color: white;
}
.option {
  margin: 1px;
  border-radius: 3px;
  min-height: 36px;
}
.header-date {
  margin: 0px 1px;
  font-size: 10px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
}
.pa-column {
  padding: 0px;
  align-self: center;
  letter-spacing: 1.2px;
}
</style>