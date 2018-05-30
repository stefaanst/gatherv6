import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import Dashboard from "../components/Dashboard.vue";
import Settings from "../components/Settings.vue";
import Friends from "../components/friends/Friends.vue";
import Events from "../components/events/Events.vue";
import Create from "../components/events/Create.vue";
import EventDetail from "../components/events/detail/EventDetail.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/dashboard", component: Dashboard },
  { path: "/friends", component: Friends },
  { path: "/settings", component: Settings },
  { path: "/events", component: Events },
  { path: "/events/create", component: Create },
  { path: "/events/:id", component: EventDetail, props: true }
];
