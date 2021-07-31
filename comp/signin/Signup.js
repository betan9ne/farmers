import React, {useState, useRef } from 'react';
import { Alert, FlatList, TextInput, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import firebase from './../../firebase'
import locations from '../explore/locations'

 const Signup = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifire = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  let genderTypes = ["Male", "Female"]
  let userType = ["Buyer", "Seller", "Shop", "Transporter"]
  
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [district, setdistrict] = useState("");
  const [province, setprovince] = useState("");
  const [usertype, setusertype] = useState("");
  const[districts, setDistricts] = useState([])
  // function to request for a verification code

  const getDistricts = (item) =>{
    setDistricts(item.districts)
    setprovince(item.province)
}

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber("+26" + phoneNumber, recaptchaVerifire.current)
      .then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // do something amazing
        let userId = firebase.auth().currentUser.uid;

        const firestore = firebase.firestore();
        firestore.collection("users").doc(userId).set({
          username: username,
          name: name,
          gender: gender,
          district: district,
          province: province,
          type: usertype,
          phone: phoneNumber,
        });
        console.log(userId);
      });
  };

  const renderGender = ({ item }) => (             
    <TouchableOpacity onPress={()=>setgender(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10,
     backgroundColor:gender === item ? COLORS.secondary : COLORS.black}}>
      <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item}</Text></TouchableOpacity>
    )
  
    const renderType = ({ item }) => (             
      <TouchableOpacity onPress={()=>setusertype(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10,
       backgroundColor:usertype === item ? COLORS.secondary : COLORS.black}}>
        <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item}</Text></TouchableOpacity>
      )

      const renderItem = ({ item }) => (             
        <TouchableOpacity onPress={()=>getDistricts(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, 
          backgroundColor:province === item.province ? COLORS.secondary : COLORS.black}}>
          <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item.province}</Text></TouchableOpacity>
        )
        
        const renderDistricts = ({item})=>{       
          return(
          <TouchableOpacity onPress={()=>setdistrict(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, 
          backgroundColor:district === item ? COLORS.secondary : COLORS.black}}>
            <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item}</Text></TouchableOpacity>
          )  
        }

  return (
    <ScrollView style={{backgroundColor:COLORS.white, padding:SIZES.padding*3, flex:1}}>  
    <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifire}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={false} />  
       <View style={styles.miniContainer}>
       <Text style={styles.label}>Full Name</Text>
        <TextInput
          keyboardType="default"
          placeholder="*Idah Chama"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setname}
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          keyboardType="default"
          placeholder="Harry Mwanga Nkumbula"
          placeholderTextColor="rgb(135, 135, 135)"
          //   caption={errors.email.length > 0 && errors.email}
          //   status={errors.email.length > 0 ? "danger" : ""}
          style={styles.input}
          onChangeText={setusername}
        />
 
        <Text style={styles.label}>Gender</Text>
        <FlatList
            data={genderTypes}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderGender}
                contentContainerStyle={{                    
                }}
            />  
      
      </View>

      <View style={styles.miniContainer}>
      <Text style={styles.label}>Province</Text>
        {locations &&  <FlatList
            data={locations}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.province}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
        <Text style={styles.label}>District</Text>
        {districts ?  <FlatList
            data={districts}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderDistricts}
                contentContainerStyle={{                    
                }}
            /> : <Text>Select a province to view districts</Text> }

       
      
      </View>

        <Text style={styles.label}>User Type</Text>
        <FlatList
            data={userType}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderType}
                contentContainerStyle={{                    
                }}
            />  

        <Text style={styles.label}>Phone</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="097X XXX XXX"
          placeholderTextColor="rgb(135, 135, 135)"
          autoCompleteType="tel"
          style={styles.input}
          onChangeText={setPhoneNumber}
        />
    
        <TouchableOpacity style={styles.buttonLogin} onPress={sendVerification}><Text style={styles.buttonText}>Get OTP</Text></TouchableOpacity>
        <View style={{height:20}}></View>
        <TextInput
          // value="OTP"
          keyboardType="number-pad"
          placeholder="Enter OTP"
          placeholderTextColor="black"
          onChangeText={setCode}
          style={styles.input}
        />
    
      <TouchableOpacity style={styles.buttonLogin} onPress={confirmCode}><Text style={styles.buttonText}>Register</Text></TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogin_} onPress={()=>navigation.navigate("Login")}><Text style={styles.buttonLoginText}>Already have an account? Login.</Text></TouchableOpacity>
       
       
    </ScrollView>
  );
}


// Just some styles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:40,
        
       padding:SIZES.padding*2
}, 
 input:{
    paddingVertical:10, 
    paddingHorizontal:20,
    borderWidth:1, borderColor:COLORS.lightGray
 },
 label:{
     ...FONTS.h5,
     marginVertical:5
 },
 buttonLogin:{
     backgroundColor:COLORS.black,
     borderRadius:10,
     paddingVertical:20,
     marginVertical:5,
 },
 buttonText:{
    color:COLORS.white,
    textAlign:"center",
    ...FONTS.h5
 },
 buttonLoginText:{
    color:COLORS.black,
    textAlign:"center",
    ...FONTS.h5
 },
 buttonLogin_:{
    backgroundColor:COLORS.white,
    borderRadius:10,
     paddingVertical:20,
     marginVertical:5,
 }

});

export default Signup