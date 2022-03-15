import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTWaBagk38GVCcnpcxihEtrtBz7ajQN-4",
  authDomain: "sign-in-2266f.firebaseapp.com",
  projectId: "sign-in-2266f",
  storageBucket: "sign-in-2266f.appspot.com",
  messagingSenderId: "317477335149",
  appId: "1:317477335149:web:cdd5372a829248073e0f64",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "data");

getDocs(colRef)
  .then((snapshot: any) => {
    let data: any = [];
    snapshot.docs.forEach((doc: any) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    console.log(data);
  })
  .catch((err: any) => {
    console.log(err.message);
  });

export const authentication = getAuth(app);
