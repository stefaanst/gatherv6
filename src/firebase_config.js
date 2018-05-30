import * as firebase from "firebase";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyBAvr-J6gvo8KpLF7UOvK9JKNA9n_ibMEQ",
  authDomain: "gatherv6.firebaseapp.com",
  databaseURL: "https://gatherv6.firebaseio.com",
  projectId: "gatherv6",
  storageBucket: "gatherv6.appspot.com",
  messagingSenderId: "339991713336"
};

const fb = firebase.initializeApp(config);
export const auth = fb.auth();
export const db = fb.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);
export const storage = fb.storage();
