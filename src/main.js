import Vue from "vue";
import Router from "vue-router";
import { routes } from "./router";
import { store } from "./store";
import { auth } from "./firebase_config";
import Vuelidate from "vuelidate";
import VTooltip from "v-tooltip";

// APP
import App from "./App.vue";
import "./assets/styles/main.scss";

// FILTERS
import {
  monthday,
  shortdate,
  longdate,
  showMonth,
  ago,
  plustime,
  deciderdate
} from "./filters/date";

Vue.filter("monthday", monthday);
Vue.filter("ago", ago);
Vue.filter("shortdate", shortdate);
Vue.filter("longdate", longdate);
Vue.filter("showMonth", showMonth);
Vue.filter("plustime", plustime);
Vue.filter("deciderdate", deciderdate);

//ROUTER
Vue.use(Router);
Vue.use(Vuelidate);
Vue.use(VTooltip);

const router = new Router({
  mode: "history",
  routes: routes,
  linkActiveClass: "active"
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("user/PERSIST_LOGIN", user.uid);
        this.$store.dispatch("user/LOAD_USER_DATA", user.uid);
        this.$store.dispatch("friend/SET_REQUESTS", user.uid);
        this.$store.dispatch("friend/SET_FRIENDS", user.uid);
        this.$store.dispatch("event/GET_ALL_EVENTS", user.uid);
      }
    });
  }
});
