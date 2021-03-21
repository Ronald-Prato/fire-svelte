import 'firebase/firestore'

import firebase from 'firebase/app'

var firebaseConfig = {
  apiKey: "AIzaSyDTIEQqIf3unXSvvfZskiKIM_RBDLWJwaw",
  authDomain: "svelte-crud-17e8d.firebaseapp.com",
  databaseURL: "https://svelte-crud-17e8d-default-rtdb.firebaseio.com",
  projectId: "svelte-crud-17e8d",
  storageBucket: "svelte-crud-17e8d.appspot.com",
  messagingSenderId: "803484027807",
  appId: "1:803484027807:web:7f240b3e470e30ab5f0baa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();