import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, TextInput, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons"

function ManageProducts() {

    const navigation = useNavigation()
    const[docs, setDocs] = useState(null)
    useEffect(()=>{
        firebase.firestore().collection("products").where("u_id", "==", "lLXFN6xZAiwol0JEeIJ2").orderBy("createdAt", "desc").onSnapshot((snap)=>{
            let asd =[]
            snap.docs.forEach(e=>{
                let sdf ={
                    id:e.id,
                    ...e.data()
                }
                asd.push(sdf)               
            })
            setDocs(asd)
        })
    },[])
console.log(docs)

const renderItem = ({ item }) => (           
    <TouchableOpacity onPress={()=>navigation.navigate("viewProduct",{item})} style={{paddingVertical:10, borderRadius:10, marginVertical:10, backgroundColor:COLORS.white}}>
        <Text style={{paddingHorizontal:20, ...FONTS.h4, color:COLORS.black}}>{item.produce}</Text>
        <Text style={{paddingHorizontal:20, ...FONTS.h6, color:COLORS.black}}>{item.produce_category}</Text>
        <Text style={{paddingHorizontal:20, ...FONTS.h6, color:COLORS.secondary}}>Price: {item.price}</Text>
    </TouchableOpacity>
)

    return (
        <View style={{ padding:SIZES.padding*2, height:"100%"}}>
            <Text  style={{...FONTS.h5, marginVertical:10}}>You can view, edit and delete your items from here</Text>
               {docs &&  <FlatList
            data={docs}
            vertical
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
        </View>
    )
}

export default ManageProducts
