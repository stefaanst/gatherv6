<template>
    <div>
        <img :src="avatarUrl" class="avatar" />
        <span>{{fullname}}</span>
    </div>
</template>

<script>
import { db } from "../../firebase_config";
export default {
  name: "UserSearchItem",
  props: ["id"],
  data() {
    return {
      fullname: "",
      avatarUrl: ""
    };
  },
  mounted() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      db
        .collection("users")
        .doc(this.id)
        .get()
        .then(doc => {
          this.fullname = doc.data().firstname + " " + doc.data().lastname;
          this.avatarUrl = doc.data().avatarUrl;
        });
    }
  }
};
</script>

<style scoped>

</style>