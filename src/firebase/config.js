import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMuowLTjc6S8C4Mc5utBd18KidZg7_FOI",
  authDomain: "cooking-ninja-site-gb.firebaseapp.com",
  projectId: "cooking-ninja-site-gb",
  storageBucket: "cooking-ninja-site-gb.appspot.com",
  messagingSenderId: "269272499233",
  appId: "1:269272499233:web:ec80ace283db3643840f60",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
