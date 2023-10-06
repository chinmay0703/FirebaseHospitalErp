import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; // Import Firebase Authentication
const firebaseConfig = {
  apiKey: "AIzaSyDvdJcOprSWSTQG58gPUKvVJWoHolim1c4",
  authDomain: "rebalance-9861b.firebaseapp.com",
  projectId: "rebalance-9861b",
  storageBucket: "rebalance-9861b.appspot.com",
  messagingSenderId: "715196044272",
  appId: "1:715196044272:web:c8ca6b532ff665c78f8335",
  measurementId: "G-2H33W6062E"
};
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth(); // Initialize Firebase Authentication
  
  export { db, auth };