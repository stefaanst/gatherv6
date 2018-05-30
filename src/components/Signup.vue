<template>
  <div class="signup-page container">
    <div class="signup-header">
      <div class="signup-title has-text-centered">
        Create account
      </div>
    </div>
    <div class="error-container" v-if="error">
      <div class="error-message">
        <p>{{error.message}}</p>
      </div>
      <div v-if="error.code === 'auth/email-already-in-use'">
        <div class="error-message">
          <a @click="toLogin">Click here</a> to log in instead.
        </div>
      </div>
    </div>
    <transition name="fade" appear>
      <form @submit.prevent="signUp" class="signup-form">
        <div class="field">
          <label>E-Mail *</label>
          <div class="control">
            <input class="input" :class="$v.email.$invalid && $v.email.$dirty ? 'error' : ''" type="email" placeholder="" v-model.trim="email" @input="delayTouch($v.email)">
          </div>
          <transition name="fade">
            <p class="form-error-message" v-if="!$v.email.email && $v.email.$dirty">
              Please enter a valid e-mail address.</p>
          </transition>
        </div>
        <div class="field">
          <label>Password *</label>
          <div class="control">
            <input class="input" :class="$v.password.$invalid && $v.password.$dirty ? 'error' : ''" type="password" placeholder="" v-model.trim="password" @input="delayTouch($v.password)">
          </div>
          <transition name="fade">
            <p class="form-error-message" v-if="$v.password.$dirty && !$v.password.minLength">
              Must be at least 4 characters long.</p>
          </transition>
        </div>
        <div class="field">
          <label>Repeat Password *</label>
          <div class="control">
            <input class="input" :class="$v.repeat.$invalid && $v.repeat.$dirty ? 'error' : ''" type="password" placeholder="" v-model.trim="repeat" @input="delayTouch($v.repeat)">
          </div>
          <transition name="fade">
            <p class="form-error-message" v-if="$v.repeat.$dirty && !$v.repeat.sameAsPassword">
              Passwords must be identical.</p>
          </transition>
        </div>
        <div class="field">
          <label>First Name *</label>
          <div class="control">
            <input class="input" :class="$v.firstname.$invalid && $v.firstname.$dirty ? 'error' : ''" type="text" placeholder="" v-model.trim="firstname" @input="delayTouch($v.firstname)">
          </div>
        </div>
        <div class="field">
          <label>Last Name *</label>
          <div class="control">
            <input class="input" :class="$v.lastname.$invalid && $v.lastname.$dirty ? 'error' : ''" type="text" placeholder="" v-model.trim="lastname" @input="delayTouch($v.firstname)">
          </div>
        </div>
        <div class="field has-text-centered">
          <button class="button" type="submit">SIGN UP</button>
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
import { db } from "../firebase_config";

import {
  required,
  minLength,
  sameAs,
  email,
  maxLength,
  alphaNum,
  alpha
} from "vuelidate/lib/validators";

import debounce from "lodash/debounce";
const touchMap = new WeakMap();

export default {
  name: "Signup",
  data() {
    return {
      unique: true,
      firstname: "",
      lastname: "",
      password: "",
      repeat: "",
      email: ""
    };
  },
  validations: {
    email: {
      email,
      required
    },
    firstname: {
      required,
      minLength: minLength(3),
      alpha
    },
    lastname: {
      required,
      minLength: minLength(3),
      alpha
    },

    password: {
      required,
      minLength: minLength(4)
    },
    repeat: {
      required,
      minLength: minLength(4),
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 500));
    },

    signUp() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("user/SIGNUP_USER", {
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname
        });
      }
    },
    toLogin() {
      this.$store.dispatch("CLEAR_ERROR");
      this.$router.push("/login");
    }
  },
  watch: {
    user(value) {
      if (value !== undefined && value !== null) {
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
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .signup-header {
    margin-top: 64px;
    flex: 1;
    width: 50%;
    background: $gbgheader;
    border-left: 3px solid $gprimary;
    border-radius: 2px;
    padding: 8px;

    .signup-title {
      padding: 16px;
      font-size: 24px;
      text-transform: uppercase;
      color: $gprimarylight;
      letter-spacing: 1.3px;
    }
  }
  .signup-form {
    // padding: 16px;
    // margin-top: 8px;
    // border-top: 2px solid #30313d;
    padding-top: 24px;
    width: 50%;
    // border: 1px solid $gborder;
    // background: #30313d;
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
}
</style>