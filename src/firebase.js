import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAOp_ddJTwh5UeZTLvoSTCED8v_xTPodcw",
    authDomain: "chat-system-1e372.firebaseapp.com",
    projectId: "chat-system-1e372",
    storageBucket: "chat-system-1e372.appspot.com",
    messagingSenderId: "769535096281",
    appId: "1:769535096281:web:15e8b92d5a2dea7a2215c8"
  };
  // Initialize Firebase
const firebaseapp =  firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore()
const auth = firebase.auth()

export {db,auth}