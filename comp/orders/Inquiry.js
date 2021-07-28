import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useGetUser from "../crud/useGetUser";

const Inquiry = ({ route }) => {
  const navigation = useNavigation();
  let data = route.params.data;
  let user = useGetUser(data.u_id).docs;
  const [bags, setBags] = useState(null);

<<<<<<< HEAD
  function sendInquiry() {
    let inquiry = {
      buyer: firebase.auth().currentUser.uid,
      createdAt: new Date(Date.now()).toString(),
      price: data.price,
      produce: data.produce,
      quant: bags,
      seller: data.u_id,
    };
    firebase
      .firestore()
      .collection("inquires")
      .add(inquiry)
      .then(() => {
        console.log("Inquiry sent");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: "100%",
        padding: SIZES.padding,
      }}
    >
      <View style={{ backgroundColor: COLORS.white, flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: COLORS.dark2,
            marginHorizontal: 5,
            flex: 1,
            padding: SIZES.padding * 2,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {data.produce}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h6 }}>
            {data.produce_category}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.black,
            marginHorizontal: 5,
            flex: 1,
            padding: SIZES.padding * 2,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{user.name}</Text>
          <Text style={{ color: COLORS.white, ...FONTS.h6 }}>{user.type}</Text>
        </View>
      </View>
      {/* <View>
                <Text>Am offering to pay K15kwacha for 1 KG, i will need 10 bags of 5KG</Text>
            </View> */}
      <View style={{ padding: SIZES.padding }}>
        <Text style={{ ...FONTS.h4 }}>Make offer</Text>
        <Text>
          My current price for 1KG of {data.produce} is ZMW {data.price} {"\n"}
        </Text>
        <Text>How many bags of {data.produce} do you need?</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="e.g. 10"
          onChangeText={(value) => setBags(value)}
          style={{
            padding: SIZES.padding,
            borderRadius: 5,
            marginVertical: 10,
            borderWidth: 0.2,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.black,
          marginTop: 40,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onPress={() => sendInquiry()}
      >
        <Text style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}>
          Make Offer
        </Text>
      </TouchableOpacity>
    </View>
  );
};
=======
    let data = route.params.data
    let user = useGetUser(data.u_id).docs
    const[bags, setBags] = useState()
    const[msg, setMsg] = useState()
    function send_request(){
        let asd ={
            quant: bags,
            createdAt : new Date(Date.now()).toString(),
            price: data.price,
            produce: data.produce,
            seller: data.u_id,
            buyer: firebase.auth().currentUser.uid
        }
        firebase.firestore().collection("inquires").add(asd).then(()=>{
            setMsg("sent")
        }).catch((e)=>{
            console.log(e)
        })
    }
    
    return (
        <View style={{backgroundColor:COLORS.white, height:"100%",  padding:SIZES.padding}}>
            <View style={{backgroundColor:COLORS.white, flexDirection:"row",}}>
            <View style={{backgroundColor:COLORS.dark2, marginHorizontal:5, flex:1, padding: SIZES.padding*2, borderRadius:10,}}>
                <Text style={{color:COLORS.white, ...FONTS.h4}}>{data.produce}</Text>
                <Text style={{color:COLORS.white, ...FONTS.h6}}>{data.produce_category}</Text>
            </View>
            <View style={{backgroundColor:COLORS.black,  marginHorizontal:5, flex:1, padding: SIZES.padding*2, borderRadius:10,}}>
                <Text style={{color:COLORS.white, ...FONTS.h4}}>{user.name}</Text>
                <Text style={{color:COLORS.white, ...FONTS.h6}}>{user.type}</Text>
            </View>
            </View>
            {/* <View>
                <Text>Am offering to pay K15kwacha for 1 KG, i will need 10 bags of 5KG</Text>
            </View> */}
            <View style={{padding:SIZES.padding}}>
                <Text style={{...FONTS.h4}}>Make offer</Text>
                <Text>My current price for 1KG of {data.produce} is ZMW {data.price} {"\n"}</Text>
                <Text>How many bags of {data.produce} do you need?</Text>
                <TextInput keyboardType="number-pad" placeholder="e.g. 10" onChangeText={(value)=>setBags(value)} style={{padding: SIZES.padding, borderRadius:5, marginVertical:10, borderWidth:0.2}} />
                <Text>{msg}</Text>
            </View>
            <TouchableOpacity style={{backgroundColor:COLORS.black, marginTop:40, borderRadius:10, paddingHorizontal:30, paddingVertical:20}} onPress={()=>send_request()}>
                    <Text style={{color:COLORS.white, textAlign:"right", ...FONTS.h4}}>Send request</Text>
                </TouchableOpacity>   
        </View>
    )
}
>>>>>>> dbb5d9676f23be431068bfe8ba22b65321fb0661

export default Inquiry;
