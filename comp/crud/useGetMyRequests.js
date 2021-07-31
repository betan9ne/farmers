import React from 'react'
import firebase from "../..//firebase";

function useGetMyRequests() {
    const [docs, setDocs] = React.useState([]);

    let user = firebase.auth().currentUser.uid;
   
    React.useEffect(() => {
      firebase
        .firestore()
        .collection("inquires")
        .where("buyer", "==", user)
        .onSnapshot((snap) => {
          let data = [];
          snap.docs.forEach((e) => {
            let asd = {
              id: e.id,
              ...e.data(),
            };
            data.push(asd);
          });
          setDocs(data);
        });
    }, []);
    return { docs };
}

export default useGetMyRequests
