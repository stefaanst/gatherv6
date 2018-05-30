import { auth, db } from "../../firebase_config";

const state = {
  user: null
};

const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  }
};

const actions = {
  SIGNUP_USER: ({ commit }, payload) => {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        let userObj = {
          id: user.uid,
          firstname: payload.firstname,
          lastname: payload.lastname,
          fullname:
            payload.firstname.toLowerCase() +
            " " +
            payload.lastname.toLowerCase(),
          email: payload.email,
          avatarUrl: `https://ui-avatars.com/api/?name=${payload.firstname}+${
            payload.lastname
          }`
        };
        db
          .collection("users")
          .doc(user.uid)
          .set(userObj)
          .then(commit("SET_USER", userObj));
      })
      .catch(e => {
        commit("SET_ERROR", e, { root: true });
      });
  },

  LOGIN_USER: ({ commit }, payload) => {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("SET_USER", { id: user.uid });
      })
      .catch(e => {
        commit("SET_ERROR", e, { root: true });
      });
  },
  LOGOUT_USER: ({ commit }) => {
    auth.signOut().then(commit("SET_USER", null));
  },
  PERSIST_LOGIN: ({ commit }, payload) => {
    commit("SET_USER", payload);
  },
  LOAD_USER_DATA: ({ commit }, payload) => {
    let userObj = {};
    db
      .collection("users")
      .doc(payload)
      .get()
      .then(doc => {
        userObj.id = payload;
        userObj.firstname = doc.data().firstname;
        userObj.lastname = doc.data().lastname;
        userObj.fullname = doc.data().fullname;
        userObj.avatarUrl = doc.data().avatarUrl;
        userObj.email = doc.data().email;
        commit("SET_USER", userObj);
      });
  },
  UPDATE_USER_AVATAR: ({ commit, getters }, payload) => {
    let userObj = { ...getters.user, avatarUrl: payload };
    commit("SET_USER", userObj);
  }
};

const getters = {
  user(state) {
    return state.user;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
