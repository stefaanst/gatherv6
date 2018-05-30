const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// exports.addFullName = functions.firestore
//   .document("users/{userId}")
//   .onCreate((snap, context) => {
//     let userObj = snap.data();
//     let fullname = userObj.firstname + " " + userObj.lastname;
//     admin
//       .firestore()
//       .collection("fullnames")
//       .doc(userObj.id)
//       .set({ fullname: fullname.toLowerCase() })
//       .then(() => {
//         console.log("fullname saved");
//       });
//   });
