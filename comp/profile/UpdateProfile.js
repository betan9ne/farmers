import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import locations from '../explore/locations'

const updateProfile = ({ route }) => {
  const navigation = useNavigation();

  // let user = useGetUser(firebase.auth().currentUser.uid).docs;
  let user = route.params.user;

  console.log(user);
  // console.log(data);
  const [username, setusername] = useState(user.username);
  const [name, setname] = useState(user.name);
  const [gender, setgender] = useState(user.gender);
  const [district, setdistrict] = useState(user.district);
  const [province, setprovince] = useState(user.province);
  const [type, setusertype] = useState(user.type);
  const[districts, setDistricts] = useState([])
  // function to request for a verification code
  let userId = firebase.auth().currentUser.uid;

  let genderTypes = ["Male", "Female"]
  let userType = ["Buyer", "Seller", "Shop", "Transporter"]
  const update = () => {
    // do something amazing

    const firestore = firebase.firestore();
    firestore
      .collection("users")
      .doc(userId)
      .update({
        name: name,
        username: username,
        gender: gender,
        district: district,
        province: province,
        type: type,
      })
      .then(() => {
        navigation.goBack();
      });

    console.log("update happened");
  };

  const getDistricts = (item) =>{
    setDistricts(item.districts)
    setprovince(item.province)
}

const renderGender = ({ item }) => (             
  <TouchableOpacity onPress={()=>setgender(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10,
   backgroundColor:user.gender === item ? COLORS.secondary : COLORS.black}}>
    <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item}</Text></TouchableOpacity>
  )

  const renderType = ({ item }) => (             
    <TouchableOpacity onPress={()=>setusertype(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10,
     backgroundColor:user.type === item ? COLORS.secondary : COLORS.black}}>
      <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item}</Text></TouchableOpacity>
    )

const renderItem = ({ item }) => (             
<TouchableOpacity onPress={()=>getDistricts(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, 
  backgroundColor:user.province === item.province ? COLORS.secondary : COLORS.black}}>
  <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item.province}</Text></TouchableOpacity>
)

const renderDistricts = ({item})=>{       
  return(
  <TouchableOpacity onPress={()=>setdistrict(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, 
  backgroundColor:user.district === item ? COLORS.secondary : COLORS.black}}>
    <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item}</Text></TouchableOpacity>
  )  
}

  return (
    <ScrollView style={styles.container}>
    
      <Text style={styles.txth2}>
        {" "}
        Feel free to edit and update your profile, infact we encourage it.
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.personalContainer}>
          <Text style={styles.txth3}>Full Name</Text>
          <TextInput
            keyboardType="default"
            placeholder="Dorian Mutansula"
            placeholderTextColor={COLORS.Gray}
            style={styles.input}
            autoCompleteType="name"
            onChangeText={setname}
            defaultValue={user && user.name}
            // value={user.name}
          />
          <Text style={styles.txth3}>User Name</Text>
          <TextInput
            keyboardType="default"
            placeholder="Dorain"
            placeholderTextColor={COLORS.Gray}
            style={styles.input}
            autoCompleteType="username"
            onChangeText={setusername}
            defaultValue={user && user.username}
          />

          <Text style={styles.txth3}>Gender</Text>
          <FlatList
            data={genderTypes}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderGender}
                contentContainerStyle={{                    
                }}
            />  
      
          <Text style={styles.txth3}>Province</Text>
          {locations &&  <FlatList
            data={locations}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.province}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
      
          <Text style={styles.txth3}>District</Text>
          {districts ?  <FlatList
            data={districts}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderDistricts}
                contentContainerStyle={{                    
                }}
            /> : <Text>Select a province to view districts</Text> }
        
          <Text style={styles.txth3}>User type</Text>
          <FlatList
            data={userType}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderType}
                contentContainerStyle={{                    
                }}
            />  
        </View>
      </View>

      <TouchableOpacity style={{backgroundColor:COLORS.black, marginBottom:20, marginTop:40, borderRadius:10, paddingHorizontal:30, paddingVertical:20}} 
      onPress={()=>update()}>
            <Text style={{color:COLORS.white, textAlign:"right", ...FONTS.h4}}>Update Profile</Text>
      </TouchableOpacity>  
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    paddingHorizontal:SIZES.padding*2,
     backgroundColor: "white",
    marginBottom:0,
    paddingBottom:30
  },
  buttonText1: {
    textAlign: "left",
  },
  buttonText2: {
    textAlign: "right",
  },
   button1: {
    flex: 0.5,
    // textAlign: "left",
    backgroundColor: "white",
    marginBottom: 20,
    padding: SIZES.padding * 2,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 100,
  },
  txth1: {
    marginTop: "5%",
    ...FONTS.h1,
  },
  txth2: {
    ...FONTS.h5,
   
    textAlign: "left",
    marginBottom: "10%",
    marginTop: "5%",
  },
  txth3: {
    ...FONTS.h5,
    textAlign: "left",
    marginTop:10,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    textAlign: "left",
    borderWidth:0.5,
    borderColor:COLORS.dark2
  },
});

export default updateProfile;
