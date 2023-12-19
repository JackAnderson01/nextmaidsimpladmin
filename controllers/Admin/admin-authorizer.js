// pages/api/firebase.js
import admin from "firebase-admin";

//TODO reopen tomorrow
const serviceAccount = require("./../../resolute-arcana-397515-firebase-adminsdk-f63ju-588e740d4b.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://resolute-arcana-397515-default-rtdb.firebaseio.com/",
    storageBucket: "gs://resolute-arcana-397515.appspot.com",
  });
}

export { admin };

// const admin = require("firebase-admin");
// const serviceAccount = require("./../../maidsimpl-dev-firebase-adminsdk-cym66-ff09e7c5c9.json"); // Download this from Firebase Console

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
