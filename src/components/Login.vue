<template>
  <div class="login-page container">
    <div class="login-header">
      <div class="login-title has-text-centered">LOGIN</div>
    </div>
    <transition name="fade" mode="out-in" appear>
      <div class="error-container" v-if="error">
        <p>{{error.message}}</p>
      </div>
    </transition>
    <form class="login-form" @submit.prevent="login">
      <div class="field">
        <label>E-Mail</label>
        <div class="control">
          <input class="input" type="email" v-model="email">
        </div>
      </div>
      <div class="field">
        <label>Password</label>
        <div class="control">
          <input class="input" type="password" v-model="password">
        </div>
      </div>
      <div class="field has-text-centered">
        <button class="button" type="submit">
          LOG IN
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  watch: {
    user(value) {
      if (value !== undefined && value !== undefined) {
        this.$store.dispatch("CLEAR_ERROR");
        this.$router.push("/dashboard");
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    error() {
      return this.$store.getters.error;
    }
  },
  methods: {
    login() {
      this.$store.dispatch("user/LOGIN_USER", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login-header {
    margin-top: 64px;
    flex: 1;
    width: 50%;
    background: $gbgheader;
    border-left: 3px solid $gprimary;
    border-radius: 2px;
    padding: 8px;

    .login-title {
      padding: 16px;
      font-size: 24px;
      text-transform: uppercase;
      color: $gprimarylight;
      letter-spacing: 1.3px;
    }
  }
  .login-form {
    // padding: 16px;
    padding-top: 24px;
    width: 50%;
    // border: 1px solid $gborder;
    // background: #3c3d48;
    .field {
      label {
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 1.1px;
        padding-left: 2px;
        color: $glabel;
      }
      input {
        background: $gbginput;
        border: 1px solid $gborder;
        outline: none;
        color: white;
        border-radius: 3px;
        font-size: 18px;
        // width: 60%;
      }
      .error {
        // border: 1px solid $gerror;
      }
      button {
        background: $gprimary;
        color: white;
        border: 0px;
        border-radius: 3px;
        font-size: 18px;
        width: 50%;
        margin-top: 16px;
        // font-weight: bold;
        letter-spacing: 1.7px;
      }
    }
    .form-error-message {
      margin-top: 8px;
      background: $gbgerror;
      padding: 8px;
      color: $gerror;
      border-radius: 4px;
      // font-style: italic;
    }
  }
  .error-container {
    width: 60%;
    margin-top: 32px;
    padding: 16px;
    border-left: 3px solid $gerror;
    background: $gbgerror;
    color: $gerror;
    border-radius: 2px;
  }
}
</style>