import React, {useState, useRef } from 'react';
import { Alert, SafeAreaView, TextInput, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import firebase from './../../firebase'
 
 const Signup = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifire = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  
  
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [district, setdistrict] = useState("");
  const [province, setprovince] = useState("");
  const [usertype, setusertype] = useState("");

  // function to request for a verification code

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

  // validating errors
  const validateUsername = () => {
    if (username < 3) {
      console.log("username is less than 3 " + username);
    }
    if (name < 3) {
      console.log("name is less than 3 " + name);
    }
    if (!phoneNumber) {
      console.log(
        "phone number should be more than 8 characters " + phoneNumber
      );
    }
  };

  return (
    <ScrollView style={{backgroundColor:COLORS.white, padding:SIZES.padding*3, flex:1}}>
      
      <Text style={{...FONTS.h2, marginBottom:30}}>Register to get Started</Text>
      <Text style={{}}></Text>
      <View style={styles.miniContainer}>
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

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          keyboardType="default"
          placeholder="*Idah Chama"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setname}
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          keyboardType="default"
          placeholder="Male / Female"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setgender}
        />
      </View>

      <View style={styles.miniContainer}>
        <Text style={styles.label}>District</Text>
        <TextInput
          keyboardType="default"
          placeholder="Kabwata"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setdistrict}
        />

        <Text style={styles.label}>Province</Text>
        <TextInput
          keyboardType="default"
          placeholder="Lusaka"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setprovince}
        />
      </View>

      <View style={styles.miniContainer}>
        <Text style={styles.label}>User Type</Text>
        <TextInput
          keyboardType="default"
          placeholder="Buyer / Seller"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setusertype}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          keyboardType="default"
          placeholder="+260 97X XXX XXX"
          placeholderTextColor="rgb(135, 135, 135)"
          autoCompleteType="tel"
          style={styles.input}
          onChangeText={setPhoneNumber}
        />
    
        <TouchableOpacity style={styles.buttonLogin} onPress={sendVerification}>
          <Text style={styles.buttonText}>Get OTP </Text>
        </TouchableOpacity>
        <View style={{height:20}}></View>
        <TextInput
          // value="OTP"
          keyboardType="number-pad"
          placeholder="Enter OTP"
          placeholderTextColor="black"
          onChangeText={setCode}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.buttonLogin} onPress={confirmCode}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin_} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.buttonLoginText}>Already have an account? Login.</Text>
      </TouchableOpacity>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifire}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={true || false /* experimental */}
      />
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
    paddingHorizontal:20
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