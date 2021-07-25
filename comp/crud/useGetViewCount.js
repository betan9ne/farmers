import React from 'react'
import firebase from '../../firebase'

const useGetViewCount  =(id) => {

    const[docs, setDocs] = React.useState([])
    let counter = 0
    React.useEffect(() => {     
            let data = []
      const unsub =  firebase.firestore().collection("products").where("u_id","==",id).get().then((doc)=>{   
          doc.docs.forEach(e=>{
              let asd = {
                  id: e.id,
                  ...e.data()
              }
              data.push(asd)
          })     
        setDocs(data)        
      })     
    }, [])
    
  docs &&  docs.forEach(e=>{       
        counter = counter + e.views
    })

    return counter
}

export default useGetViewCount