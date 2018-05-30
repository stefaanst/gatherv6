<template>
    <div class="participant-detail">
        {{firstname}} {{lastname}}
    </div>
</template>

<script>
import { db } from "@/firebase_config";
export default {
  name: "Participant",
  props: ["id"],
  data() {
    return {
      firstname: "",
      lastname: ""
    };
  },
  mounted() {
    db
      .collection("users")
      .doc(this.id)
      .get()
      .then(doc => {
        this.firstname = doc.data().firstname;
        this.lastname = doc.data().lastname;
      });
  }
};
</script>

<style scoped>
.participant-detail {
  font-size: 12px;
}
</style>