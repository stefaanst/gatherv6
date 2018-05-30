<template>
    <div class="container step-page ">
        <div class="step-header has-text-centered">
            <div class="step-title">
                CREATE A NEW EVENT
            </div>
            <div class="step-subtitle">
                What's the occasion?
            </div>
        </div>
        <form @submit.prevent class="step-form">
            <div class="field">
                <label>Title</label>
                <div class="control">
                    <input type="text" class="input" v-model="title">
                </div>
            </div>
            <div class="field">
                <label>Description</label>
                <div class="control">
                    <textarea rows="5" v-model="description" class="textarea" />
                </div>
            </div>
        </form>
        <div class="has-text-centered">
            <button class="button next-step" @click="goWhen">
                Next step
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: "What",
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    goWhen() {
      this.$store.commit("event/SET_WHAT", {
        title: this.title,
        description: this.description
      });
      this.$store.commit("event/SET_ACTIVE_STEP", "When");
    }
  }
};
</script>

<style scoped>
</style>