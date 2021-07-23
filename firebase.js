import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage"
import "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0fKsJVPVneoUUv9vgcFi0BYjUYhWIY0s",
  authDomain: "farmers-4cf6c.firebaseapp.com",
  projectId: "farmers-4cf6c",
  storageBucket: "farmers-4cf6c.appspot.com",
  messagingSenderId: "625983186753",
  appId: "1:625983186753:web:b959153bab057a6180a3c0"
};
  if(firebase.apps.length === 0)
  {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;
