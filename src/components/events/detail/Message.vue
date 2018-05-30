<template>
    <div class="event-message-item">
        {{message.message}} by {{message.author_fullname}} {{message.sent_at | ago }}
    </div>
</template>

<script>
export default {
  name: "Message",
  props: ["message"]
};
</script>

<style lang="scss" scoped>
.event-message-item {
  padding: 8px;
  background: $gbgitems;
  margin-top: 2px;
  font-size: 12px;
  border-radius: 16px;
}
</style>