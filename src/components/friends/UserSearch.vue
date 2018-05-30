<template>
  <div>
    <div>
      <input type="text" v-model="searchTerm" @keyup="searchUser">
    </div>
    <transition-group name="fade" mode="out-in" appear>
      <div v-for="result in results" :key="result.id" class="results-container" v-if="showResults">
        <UserSearchItem :id="result.id" @click.native="selectUser(result)" />
      </div>
    </transition-group>
    <button class="button" @click="sendFriendRequest">Send friend request</button>
  </div>
</template>

<script>
import UserSearchItem from "./UserSearchItem.vue";
import { debounce } from "lodash";
import { db } from "../../firebase_config";
export default {
  name: "UserSearch",
  components: {
    UserSearchItem
  },
  data() {
    return {
      searchTerm: "",
      results: [],
      selected: null,
      showResults: false
    };
  },
  watch: {
    searchTerm(value) {
      if (value.length > 2) {
        this.showResults = true;
      } else {
        this.showResults = false;
      }
    }
  },
  methods: {
    searchUser: debounce(function() {
      this.results = [];
      if (this.searchTerm.length > 2) {
        let st = this.searchTerm.toLowerCase();
        let end = st + "\uf8ff";
        db
          .collection("users")
          .orderBy("fullname")
          .limit(5)
          .startAt(st)
          .endAt(end)
          .get()
          .then(snap => {
            let r = [];
            snap.forEach(doc => {
              let searchObj = { id: doc.id, ...doc.data() };
              r.push(searchObj);
              this.results = r;
            });
          });
      }
    }, 300),
    selectUser(user) {
      this.searchTerm = user.fullname;
      this.selected = user;
      this.showResults = false;
    },
    sendFriendRequest() {
      if (this.selected !== null) {
        this.$store
          .dispatch("friend/SEND_FRIEND_REQUEST", this.selected.id)
          .then(() => {
            this.results = [];
            this.searchTerm = "";
            this.selected = null;
            this.showResults = false;
          });
      }
    }
  }
};
</script>

<style scoped>

</style>