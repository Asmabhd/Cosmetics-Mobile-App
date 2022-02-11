import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBUniANBbTcmFXudtanw70ExMEYpIz-Viw",
  authDomain: "basethinkbio.firebaseapp.com",
  databaseURL: "https://basethinkbio.firebaseio.com",
  projectId: "basethinkbio",
  storageBucket: "basethinkbio.appspot.com",
  messagingSenderId: "974210084367",
  appId: "1:974210084367:web:33167e4aa7691a421dfd7a",
  measurementId: "G-X464C43E3W",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
