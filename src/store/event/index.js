import { db } from "../../firebase_config";

const state = {
  events: [],
  newEvent: {
    title: "",
    description: "",
    suggestedDates: [],
    location: {
      lat: "",
      lng: "",
      address: ""
    },
    participants: []
  },
  activeStep: "What"
};

const mutations = {
  SET_EVENTS: (state, payload) => {
    state.events = payload;
  },
  SET_ACTIVE_STEP: (state, payload) => {
    state.activeStep = payload;
  },
  SET_WHAT: (state, payload) => {
    state.newEvent.title = payload.title;
    state.newEvent.description = payload.description;
  },

  SET_WHEN: (state, payload) => {
    state.newEvent.suggestedDates = payload;
  },

  SET_WHERE: (state, payload) => {
    state.newEvent.location.lat = payload.lat;
    state.newEvent.location.lng = payload.lng;
    state.newEvent.location.address = payload.address;
  },

  SET_WHO: (state, payload) => {
    state.newEvent.participants = payload;
  },

  RESET_NEW_EVENT: state => {
    state.newEvent.title = "";
    state.newEvent.description = "";
    state.newEvent.location.address = "";
    state.newEvent.location.lat = "";
    state.newEvent.location.lng = "";
    state.newEvent.suggestedDates = [];
    state.newEvent.participants = [];
  }
};

const actions = {
  CREATE_NEW_EVENT: ({ state, commit, rootGetters }, payload) => {
    // Convert date objects to timestamps and save them in the structure we need for firebase

    // Compose the participants object
    let pa = {};
    for (let i = 0; i < payload.length; i++) {
      pa[payload[i].id] = true;
    }
    // GET FIRESTORE REF FOR NEW EVENT & COMPOSE OBJECT FOR SUBMISSION
    let userId = rootGetters["user/user"].id;
    let newEventRef = db.collection("events").doc();
    let tsDates = state.newEvent.suggestedDates.map(date => {
      return date.getTime().toString();
    });
    let options = {};
    for (let i = 0; i < tsDates.length; i++) {
      options = { ...options, [tsDates[i]]: { [userId]: true } };
    }
    let newEventObj = {
      id: newEventRef.id,
      created_at: new Date().getTime(),
      creator_id: userId,
      date_confirmed: false,
      title: state.newEvent.title,
      description: state.newEvent.description,
      location: {
        address: state.newEvent.location.address,
        lat: state.newEvent.location.lat,
        lng: state.newEvent.location.lng
      },
      // Add the creator id to the participants list
      participants: { ...pa, [userId]: true },
      options: options
    };
    newEventRef.set(newEventObj).then(() => {
      commit("RESET_NEW_EVENT");
    });
  },

  GET_ALL_EVENTS: ({ commit }, payload) => {
    db
      .collection("events")
      .where(`participants.${payload}`, "==", true)
      .onSnapshot(snap => {
        let events = [];
        snap.forEach(doc => {
          events.push(doc.data());
        });
        commit("SET_EVENTS", events);
      });
  },

  SEND_MESSAGE: ({ rootGetters }, payload) => {
    let fullname =
      rootGetters["user/user"].firstname +
      " " +
      rootGetters["user/user"].lastname;

    let msgRef = db
      .collection("events")
      .doc(payload.id)
      .collection("messages")
      .doc();
    let msgObj = {
      id: msgRef.id,
      message: payload.message,
      author_id: rootGetters["user/user"].id,
      author_fullname: fullname,
      sent_at: new Date().getTime()
    };
    msgRef.set(msgObj).then(() => {
      console.log("sent message");
    });
  }
};

const getters = {
  events(state) {
    return state.events;
  },

  activeStep(state) {
    return state.activeStep;
  },

  newEvent(state) {
    return state.newEvent;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
