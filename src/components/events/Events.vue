<template>
  <div class="container" v-if="events !== null">
    <div class="events-list">
      <div class="event box" v-for="event in sortedEvents" :key="event.id" @click="loadEvent(event.id)">
        {{event.title}} - {{ event.created_at | plustime }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Events",
  computed: {
    events() {
      return this.$store.getters["event/events"];
    },
    sortedEvents() {
      return this.events
        .sort((a, b) => {
          return a.created_at - b.created_at;
        })
        .reverse();
    }
  },
  methods: {
    loadEvent(id) {
      this.$router.push("/events/" + id);
    }
  }
};
</script>

<style scoped>
</style>