<template>
  <div class="event-messages">
    <div class="event-message-box">
      <div v-for="message in messages" :key="message.id" class="event-message-container">
        <Message :message="message" class="event-message-item" />
        <button class="button" v-if="canDelete(message.author_id)" @click="deleteMessage(message.id)">X</button>
      </div>
    </div>
    <div class="send-message-container">
      <SendMessage :id="id" />
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase_config";
import Message from "./Message.vue";
import SendMessage from "./SendMessage.vue";
export default {
  name: "EventMessages",
  props: ["messages", "id"],
  components: {
    Message,
    SendMessage
  },
  methods: {
    canDelete(id) {
      return id === this.user.id;
    },
    deleteMessage(id) {
      db
        .collection("events")
        .doc(this.id)
        .collection("messages")
        .doc(id)
        .delete()
        .then(() => {
          console.log("deleted");
        });
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  }
};
</script>

<style lang="scss" scoped>
.event-messages {
  .event-message-box {
    max-height: 400px;
    overflow-y: auto;
    .event-message-container {
      display: flex;
      align-items: center;

      button {
        background: transparent;
        color: hotpink;
        border: 0;
        font-size: 10px;
      }
    }
  }
  .send-message-container {
    margin-top: 16px;
  }
}
</style>