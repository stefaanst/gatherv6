<template>
  <div class="bg">
    <TheHeader id="header" />
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TheHeader from "@/components/UI/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheHeader
  }
};
</script>

<style scoped>
#header {
  margin-bottom: 16px;
}

.bg {
  /* background-image: linear-gradient(
    to right bottom,
    #3a3e4e,
    #353747,
    #303040,
    #2c2a39,
    #272332
  ); */
  /* min-height: 100vh; */
}
</style>