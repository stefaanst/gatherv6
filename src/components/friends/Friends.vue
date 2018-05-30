<template>
  <div class="container">
    <div class="add-friend">
      <UserSearch />
    </div>
    <hr>
    <div class="requests">
      <h3>Requests</h3>
      <div class="request" v-for="request in requests" :key="request.id">
        <Request :id="request.id" />
      </div>
    </div>
    <hr>
    <div class="friends">
      <h3>friends</h3>
      <div class="filter-container">
        <input type="text" v-model="searchTerm">
      </div>
      <div class="friend" v-for="friend in filteredFriends" :key="friend.id">
        <Friend :id="friend.id" />
      </div>
    </div>
  </div>
</template>

<script>
import UserSearch from "./UserSearch.vue";
import Request from "./Request.vue";
import Friend from "./Friend.vue";
export default {
  name: "Friends",
  data() {
    return {
      searchTerm: ""
    };
  },
  components: {
    Friend,
    Request,
    UserSearch
  },
  computed: {
    friends() {
      return this.$store.getters["friend/friends"];
    },
    requests() {
      return this.$store.getters["friend/requests"];
    },
    filteredFriends() {
      let st = this.searchTerm;
      let friends = this.friends;
      if (!st.length) {
        return friends;
      }
      return friends.filter(friend => {
        return friend.fullname.indexOf(st.toLowerCase()) > -1;
      });
    }
  }
};
</script>

<style lang="scss">

</style>