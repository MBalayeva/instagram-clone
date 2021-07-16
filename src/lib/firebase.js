import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAG3xPAYIYA1OSVBdQ9iTHCUB3BMn0bmsk",
  authDomain: "instagram-yt-8c999.firebaseapp.com",
  projectId: "instagram-yt-8c999",
  storageBucket: "instagram-yt-8c999.appspot.com",
  messagingSenderId: "25869418249",
  appId: "1:25869418249:web:f89c50f4b20e36460e1dd8",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
