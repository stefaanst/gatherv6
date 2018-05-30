<template>
  <div class="send-message_container">
    <textarea rows="2" cols="80" v-model="message" placeholder="Enter your message"></textarea>
    <button class="button" @click="submitMessage">SEND</button>
  </div>
</template>

<script>
export default {
  name: "SendMessage",
  props: ["id"],
  data() {
    return {
      message: ""
    };
  },
  methods: {
    submitMessage() {
      if (this.message.length > 4) {
        this.$store.dispatch("event/SEND_MESSAGE", {
          id: this.id,
          message: this.message
        });
        this.message = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.send-message_container {
  display: flex;
  align-items: center;
  button {
    background: transparent;
    color: $gprimary;
    border: 0;
    letter-spacing: 1.4px;
    font-size: 16px;
    &:hover {
      color: white;
    }
  }
  textarea {
    background: $gbginput;
    color: white;
    font-size: 12px;
    letter-spacing: 1.2px;
    padding: 8px;
    border-radius: 4px;
    border: 0px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
}
</style>