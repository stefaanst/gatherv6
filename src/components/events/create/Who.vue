<template>
  <div class="container">
    <div class="step-header has-text-centered">
      <div class="step-title">
        EVENT PARTICIPANTS
      </div>
      <div class="step-subtitle">
        Invite one or more of your friends
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <div class="friends-container">
          <div class="friends-filter">
            <div class="field">
              <label>Filter friends</label>
              <input type="text" v-model="searchTerm">
            </div>
          </div>
          <transition-group name="fade" mode="out-in">
            <div class="friend" v-for="friend in filteredFriends" :key="friend.id" :class="isParticipant(friend) ? 'selected' : ''">
              <Friend :id="friend.id" />
              <button class="button" @click="toggleParticipant(friend)">add</button>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="column is-half">
        <div class="participants-container">
          <div class="participant" v-for="pa in participants" :key="pa.id">{{pa.firstname}} {{pa.lastname}}</div>
        </div>
      </div>
      <button class="button" @click="createEvent">All done</button>
    </div>
  </div>
</template>

<script>
import Friend from "./Friend.vue";
export default {
  name: "Who",
  data() {
    return {
      searchTerm: "",
      participants: []
    };
  },
  components: {
    Friend
  },
  methods: {
    toggleParticipant(friend) {
      if (!this.isParticipant(friend)) {
        this.participants.push(friend);
      } else {
        let index = this.participants.findIndex(pa => {
          pa.id === friend.id;
        });
        this.participants.splice(index, 1);
      }
    },
    createEvent() {
      this.$store
        .dispatch("event/CREATE_NEW_EVENT", this.participants)
        .then(() => {
          this.$router.push("/dashboard");
        });

      console.log("created");
    }
  },
  mounted() {},
  computed: {
    friends() {
      return this.$store.getters["friend/friends"];
    },
    filteredFriends() {
      if (this.searchTerm.length >= 1) {
        return this.friends.filter(friend => {
          return friend.fullname.indexOf(this.searchTerm.toLowerCase()) > -1;
        });
      } else {
        return this.friends;
      }
    },
    isParticipant(friend) {
      return friend => {
        return this.participants.includes(friend);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.friends-container {
  height: 60vh;
  overflow-y: auto;
}

.selected {
  background-color: $gprimary;
}
</style>