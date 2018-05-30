<template>
  <div class="creator">
    <span v-if="userId !== id">{{firstname}} {{lastname}}</span>
    <span v-else class="has-text-weight-bold">You</span>
  </div>
</template>

<script>
import { db } from "../../../firebase_config";
export default {
  name: "EventCreator",
  data() {
    return {
      firstname: "",
      lastname: "",
      avatarUrl: ""
    };
  },
  props: ["id", "userId"],
  mounted() {
    db
      .collection("users")
      .doc(this.id)
      .get()
      .then(doc => {
        this.firstname = doc.data().firstname;
        this.lastname = doc.data().lastname;
        this.avatarUrl = doc.data().avatarUrl;
      });
  }
};
</script>

<style scoped>
.avatar-small {
  border-radius: 50%;
  height: 22px;
  width: 22px;
}
</style>