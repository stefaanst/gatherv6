<template>
  <div>
    <img :src="avatarUrl" alt="" class="avatar"> {{firstname}} {{lastname}} wants to be your friend!
    <button class="button" @click="acceptRequest">accept</button>
    <button class="button" @click="declineRequest">decline</button>
  </div>
</template>

<script>
import { db } from "../../firebase_config";
export default {
  name: "Request",
  data() {
    return {
      firstname: "",
      lastname: "",
      avatarUrl: "",
      fullname: ""
    };
  },
  props: ["id"],
  mounted() {
    this.getRequesterInfo();
  },
  methods: {
    getRequesterInfo() {
      db
        .collection("users")
        .doc(this.id)
        .get()
        .then(doc => {
          this.firstname = doc.data().firstname;
          this.lastname = doc.data().lastname;
          this.fullname = doc.data().fullname;
          this.avatarUrl = doc.data().avatarUrl;
        });
    },
    acceptRequest() {
      this.$store.dispatch("friend/ACCEPT_FRIEND_REQUEST", {
        id: this.id,
        lastname: this.lastname,
        firstname: this.firstname,
        fullname: this.fullname
      });
    },
    declineRequest() {
      this.$store.dispatch("friend/DECLINE_FRIEND_REQUEST", this.id);
    }
  }
};
</script>

<style scoped>

</style>