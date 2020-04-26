import * as app from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import * as SECRET from "./env.js";

const config = {
  apiKey: SECRET.API_KEY,
  authDomain: SECRET.AUTH_DOMAIN,
  databaseURL: SECRET.DATABASE_URL,
  projectId: SECRET.PROJECT_ID,
  storageBucket: SECRET.STORAGE_BUCKET,
  messagingSenderId: SECRET.MESSAGE_SENDER_ID,
  appId: SECRET.APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  imageUser = (uid) => this.storage.ref(`images/${uid}`);

  user = (uid) => this.db.doc(`users/${uid}`);
  users = () => this.db.collection("users");

  recommendStation = () =>
    this.db.collection("recommendedStations").doc("pending");

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  addFavRoute(incFavRoute) {
    if (!this.auth.currentUser) {
      return console.log("Not signed in");
    }

    return this.db.doc(`users/${this.auth.currentUser.uid}`).update({
      favRoutes: app.firestore.FieldValue.arrayUnion(incFavRoute),
    });
  }

  deleteFavRoute(incFavRoute) {
    if (!this.auth.currentUser) {
      return console.log("Not signed in");
    }
    console.log("INNE I DELETE");

    return this.db.doc(`users/${this.auth.currentUser.uid}`).update({
      favRoutes: app.firestore.FieldValue.arrayRemove(incFavRoute),
    });
  }

  // addAvatar(url) {

  // }

  updateEmail(email) {
    this.auth.currentUser.updateEmail(email);
  }

  updatePassword(email, password) {
    if (!password) return;
    this.auth.currentUser.updatePassword(password).then(() => {
      this.login(email, password);
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getCurrentUid() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }

  async getCurrentUserQuote() {
    const quote = await this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .get();
    return quote.get("quote");
  }
}

export default new Firebase();
