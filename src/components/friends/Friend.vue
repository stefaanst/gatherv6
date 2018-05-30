  <template>
  <div>
    <img :src="avatarUrl" class="avatar"> {{firstname}} {{lastname}}
  </div>
</template>

<script>
import { db } from "../../firebase_config";
export default {
  name: "Friend",
  props: ["id"],
  data() {
    return {
      firstname: "",
      lastname: "",
      avatarUrl: ""
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
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
  }
};
</script>

<style scoped>

</style>