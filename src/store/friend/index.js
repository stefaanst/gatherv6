import { db } from "../../firebase_config";

const state = {
  friends: [],
  requests: []
};

const mutations = {
  SET_FRIENDS(state, payload) {
    state.friends = payload;
  },

  SET_REQUESTS(state, payload) {
    state.requests = payload;
  },

  ADD_FRIEND(state, payload) {
    state.friends.push(payload);
  }
};

const actions = {
  SEND_FRIEND_REQUEST({ rootGetters }, payload) {
    let user = rootGetters["user/user"];
    let ref = db
      .collection("users")
      .doc(payload)
      .collection("requests")
      .doc(user.id);
    ref
      .set({
        requestedAt: new Date().getTime(),
        lastname: user.lastname,
        firstname: user.firstname,
        fullname: user.fullname
      })
      .then(console.log("request sent"));
  },

  ACCEPT_FRIEND_REQUEST({ rootGetters }, payload) {
    let user = rootGetters["user/user"];
    let userRef = db
      .collection("users")
      .doc(user.id)
      .collection("friends")
      .doc(payload.id);
    let requesterRef = db
      .collection("users")
      .doc(payload.id)
      .collection("friends")
      .doc(user.id);
    let deleteRef = db
      .collection("users")
      .doc(user.id)
      .collection("requests")
      .doc(payload.id);
    let batch = db.batch();
    batch.set(userRef, {
      lastname: payload.lastname,
      firstname: payload.firstname,
      fullname: payload.fullname
    });
    batch.set(requesterRef, {
      lastname: user.lastname,
      firstname: user.firstname,
      fullname: user.fullname
    });
    batch.delete(deleteRef);
    batch.commit().then(console.log("you are now friends"));
  },

  DECLINE_FRIEND_REQUEST({ rootGetters }, payload) {
    console.log(payload);
    let user = rootGetters["user/user"];
    db
      .collection("users")
      .doc(user.id)
      .collection("requests")
      .doc(payload)
      .delete()
      .then(console.log("rejected"));
  },

  SET_REQUESTS: ({ commit }, payload) => {
    db
      .collection("users")
      .doc(payload)
      .collection("requests")
      .orderBy("requestedAt")
      .onSnapshot(snap => {
        let requests = [];
        snap.forEach(doc => {
          requests.push({ id: doc.id, ...doc.data() });
        });
        commit("SET_REQUESTS", requests);
      });
  },

  SET_FRIENDS: ({ commit }, payload) => {
    db
      .collection("users")
      .doc(payload)
      .collection("friends")
      .orderBy("lastname")
      .onSnapshot(snap => {
        let friends = [];
        snap.forEach(doc => {
          friends.push({ id: doc.id, ...doc.data() });
        });
        commit("SET_FRIENDS", friends);
      });
  }
};

const getters = {
  friends(state) {
    return state.friends;
  },
  requests(state) {
    return state.requests;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
