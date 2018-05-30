<template>

  <nav class="navbar is-transparent">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="gather-logo">GATHER</router-link>
        <span class="beta">beta</span>
        <a role="button" class="navbar-burger" :class="menuActive ? 'is-active' : ''" aria-label="menu" aria-expanded="false" @click="toggleMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="menuActive? 'is-active' : ''">
        <div class="navbar-end">
          <router-link to="/login" class="navbar-item" v-if="!isAuthenticated">Login</router-link>
          <router-link to="/signup" class="navbar-item" v-if="!isAuthenticated">Sign up</router-link>
          <!-- <router-link to="/events/create" class="button new-event--button is-small" v-if="isAuthenticated">Create new event</router-link> -->
          <router-link to="/dashboard" class="navbar-item" v-if="isAuthenticated">Dashboard</router-link>
          <router-link to="/events" class="navbar-item" v-if="isAuthenticated">Events</router-link>
          <router-link to="/friends" class="navbar-item" v-if="isAuthenticated">Friends</router-link>
          <transition name="fade">
            <span class="badge" v-if="hasNewRequests" :key="requests.length"></span>
          </transition>
          <router-link to="/settings" class="navbar-item" v-if="isAuthenticated">Settings</router-link>
          <a @click="logOut" class="navbar-item" v-if="isAuthenticated">Logout</a>
          <img :src="user.avatarUrl" class="avatar navatar" v-if="isAuthenticated" />
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      menuActive: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.user !== undefined && this.user !== null ? true : false;
    },
    user() {
      return this.$store.getters["user/user"];
    },
    requests() {
      return this.$store.getters["friend/requests"];
    },
    hasNewRequests() {
      return this.requests.length > 0 ? true : false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("user/LOGOUT_USER").then(this.$router.push("/"));
    },
    close() {
      this.dropdownActive = false;
    },
    toggleMenu() {
      this.menuActive = !this.menuActive;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  // background: none;
}

.active {
  color: white;
}

.navbar-item {
  height: 50%;
  padding-top: 32px;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 3px;
}

.gather-logo {
  padding-left: 12px;
  color: white;
  letter-spacing: 1.2px;
  font-size: 24px;
  padding-top: 14px;
  &:hover {
    color: white;
  }
}
.beta {
  font-size: 14px;
  color: $gprimary;
  padding-left: 2px;
  padding-top: 24px;
  letter-spacing: 2px;
  text-transform: lowercase;
}
.navatar {
  margin-left: 12px;
  margin-top: 14px;
}
.badge {
  position: relative;
}

.badge:after {
  content: "";
  position: absolute;
  top: 16px;
  right: 4px;
  font-weight: 600;
  text-align: center;
  line-height: 23px;
  background: $gprimary;
  color: white;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.new-event--button {
  padding-top: 4px;
  margin-top: 16px;
  background: transparent;
  border: 1px solid $gprimary;
  color: white;
  font-size: 14px;
  &:hover {
    border: 1px solid darken($gprimary, 20%);
  }
}
</style>