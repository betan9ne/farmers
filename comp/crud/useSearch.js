import React from 'react'
import firebase from '../..//firebase'

const useSearch  =(search, tag) => {
    const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 
        tag === 0 ?
        firebase.firestore().collection("products").where("produce_category", "==", search).onSnapshot((snap)=>{    
        let data = [] 
          snap.docs.forEach(e=>{
              let asd = {
                    id:e.id,
                    ...e.data()
              }
              data.push(asd)
          })
          setDocs(data)
      })
      :  firebase.firestore().collection("products").where("produce", "==", search).onSnapshot((snap)=>{    
        let data = [] 
          snap.docs.forEach(e=>{
              let asd = {
                    id:e.id,
                    ...e.data()
              }
              data.push(asd)
          })
          setDocs(data)
      })     
    }, [tag, search])
    return {docs}
}

export default useSearch