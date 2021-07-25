<<<<<<< HEAD
import React, { Component } from 'react';
import { Alert, SafeAreaView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';

// Name
// gender
// district
// province
// usertype
// phone
=======
import React, { Component } from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../../firebase";
import {
  Alert,
  Button,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
>>>>>>> d384992bc421b0176f149de8a3a06210256aa252

export default function Signup() {
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
          usertype: usertype,
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
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Sign-up to create an account</Text>
        
        <View style={styles.miniContainer}>
=======
    <View style={styles.container}>
      <Text style={styles.titleText2}>Farmers</Text>
      <Text style={styles.titleText}>Sign-up to create an account</Text>
      <View style={styles.miniContainer}>
        <Text style={styles.label}>*Username</Text>
        <TextInput
          keyboardType="default"
          placeholder="Harry Mwanga Nkumbula"
          placeholderTextColor="rgb(135, 135, 135)"
          //   caption={errors.email.length > 0 && errors.email}
          //   status={errors.email.length > 0 ? "danger" : ""}
          style={styles.input}
          onChangeText={setusername}
        />

>>>>>>> d384992bc421b0176f149de8a3a06210256aa252
        <Text style={styles.label}>*Full Name</Text>
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
        <Text style={styles.label}>*District</Text>
        <TextInput
          keyboardType="default"
          placeholder="Kabwata"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setdistrict}
        />

        <Text style={styles.label}>*Province</Text>
        <TextInput
          keyboardType="default"
          placeholder="Lusaka"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setprovince}
        />
      </View>

      <View style={styles.miniContainer}>
        <Text style={styles.label}>*User Type</Text>
        <TextInput
          keyboardType="default"
          placeholder="Buyer / Seller"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setusertype}
        />

        <Text style={styles.label}>*Phone</Text>
        <TextInput
          keyboardType="default"
          placeholder="+260 97X XXX XXX"
          placeholderTextColor="rgb(135, 135, 135)"
          autoCompleteType="tel"
          style={styles.input}
          onChangeText={setPhoneNumber}
        />

<<<<<<< HEAD
        <TouchableOpacity 
        style={{backgroundColor:COLORS.black, padding:SIZES.padding*2, borderRadius:10}}>
        <Text style={{color:COLORS.white, ...FONTS.h4, textAlign:"right" }}>Login </Text>
        </TouchableOpacity>
    </SafeAreaView>
=======
        <TouchableOpacity style={styles.button} onPress={sendVerification}>
          <Text style={styles.buttonText}>Get OTP </Text>
        </TouchableOpacity>

        <TextInput
          // value="OTP"
          keyboardType="number-pad"
          placeholder="Enter OTP"
          placeholderTextColor="black"
          onChangeText={setCode}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.buttonLogin} onPress={validateUsername}>
        <Text style={styles.buttonText}> Register </Text>
      </TouchableOpacity>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifire}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={true | false /* experimental */}
      />
    </View>
>>>>>>> d384992bc421b0176f149de8a3a06210256aa252
  );
}

// Just some styles

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: {
        flex: 1,
        marginTop:40,
        height:"100%",
       padding:SIZES.padding*2
},

miniContainer: {
    flex: .9,
    width: '80%',
=======
  container: {
    flex: 1,
    width: "80%",
>>>>>>> d384992bc421b0176f149de8a3a06210256aa252
    // backgroundColor: '#ecf0f1',
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: .5,
    // borderRadius: 9,
    // borderColor: 'black',
  },

  miniContainer: {
    width: "80%",
    // backgroundColor: '#ecf0f1',
    alignItems: "center",
    margin: 5,
    paddingBottom: 5,
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 9,
<<<<<<< HEAD
    borderColor: 'rgb(163, 252, 165 )',
},

    titleText: {
        fontSize: 18,
        marginBottom: 5,
        color: 'black',
},
    titleText2: {
        marginBottom: 20,  
        fontSize: 22,
        color: 'black',
},
    label: {
        // backgroundColor: '#ecf0f1',
        margin: 10,
},
    input: {
        fontSize: 10,
        padding: 5,
        margin:3,
        // marginBottom: 5,
        width: 100,
        textAlign: 'center',
        backgroundColor: 'rgb(243, 243, 243)',
        //   borderWidth: .5,
        borderRadius: 5,
        borderColor: 'black',
},
 
=======
    borderColor: "rgb(163, 252, 165 )",
  },

  titleText: {
    fontSize: 18,
    marginBottom: 5,
    color: "black",
  },
  titleText2: {
    marginBottom: 20,
    fontSize: 22,
    color: "black",
  },
  label: {
    // backgroundColor: '#ecf0f1',
    margin: 10,
  },
  input: {
    fontSize: 10,
    padding: 5,
    margin: 3,
    // marginBottom: 5,
    width: 100,
    textAlign: "center",
    backgroundColor: "rgb(243, 243, 243)",
    //   borderWidth: .5,
    borderRadius: 5,
    borderColor: "black",
  },
  button: {
    fontSize: 6,
    //   backgroundColor: 'lightgrey',
    padding: 3,
    marginBottom: 10,
    borderWidth: 0.3,
    borderRadius: 5,
  },
  buttonLogin: {
    fontSize: 10,
    backgroundColor: "rgb(137, 234, 139)",
    color: "white",
    padding: 6,
    margin: 3,
    borderRadius: 5,
  },
>>>>>>> d384992bc421b0176f149de8a3a06210256aa252
});
