import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
 
function Feedback() {

    let navigation = useNavigation()
    const[feedback, setFeedback]= useState(null)

    function send(){
        if(feedback !== "")
        {
            let asd = {
                feedback:feedback,
                createdAt:new Date(Date.now()).toString(),
                u_id: firebase.auth().currentUser.uid
            }
            firebase.firestore().collection("feedback").add(asd).then(()=>{
                console.log("done")
                navigation.goBack()
            })
        }
    }
    return (
        <ScrollView style={{padding:SIZES.padding*2, backgroundColor:COLORS.white}}>
            <Text style={{...FONTS.h5}}>Share your feedback about the app, what you would want added or removed in the form below.{"\n\n"} Your feedback is important to us and it helps us make the app better for you.
            </Text>
            <TextInput multiline
            numberOfLines={5}  placeholder="share your feedback" onChangeText={(value)=>setFeedback(value)} style={{padding: SIZES.padding*2, borderWidth:1, borderColor:COLORS.lightGray, borderRadius:10 }} />
            <TouchableOpacity style={{backgroundColor:COLORS.black, marginBottom:20, marginTop:40, borderRadius:10, paddingHorizontal:30, paddingVertical:20}} 
      onPress={()=>send()}>
            <Text style={{color:COLORS.white, textAlign:"right", ...FONTS.h4}}>Send Feedback</Text>
      </TouchableOpacity>  
        </ScrollView>
    )
}

export default Feedback
