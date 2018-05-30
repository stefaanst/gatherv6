<template>
  <div class="settings-page container">
    <div>
      Firstname: {{user.firstname}} <br />Lastname: {{user.lastname}}
      <br/>Email: {{user.email}}
      <br/>Last logged in: {{lastLogin}}
      <br/>Member since: {{memberSince}}
    </div>
    <img :src="user.avatarUrl" class="avatar-big" v-if="user">
    <input type="file" accept="image/*" @change="onFilePicked">>
  </div>
</template>

<script>
import { storage, db, auth } from "../firebase_config";
export default {
  name: "Settings",
  mounted() {},
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    lastLogin() {
      return auth.currentUser.metadata.lastSignInTime;
    },
    memberSince() {
      return auth.currentUser.metadata.creationTime;
    }
  },
  methods: {
    onFilePicked(e) {
      let avatarRef = storage.ref(`/avatars/${this.user.id}`);
      let file = e.target.files[0];
      let filename = file.name;
      let meta = {
        contentType: file.type
      };
      avatarRef
        .put(file, meta)
        .then(snap => {
          console.log("uploaded avatar");
          db
            .collection("users")
            .doc(this.user.id)
            .set({ avatarUrl: snap.downloadURL }, { merge: true })
            .then(() => {
              this.$store.dispatch("user/UPDATE_USER_AVATAR", snap.downloadURL);
              console.log("avataUrl updated");
            })
            .catch(e => {
              commit("SET_ERROR", e, { root: true });
            });
        })
        .catch(e => {
          commit("SET_ERROR", e, { root: true });
        });
    }
  }
};
</script>

<style scoped>
</style>