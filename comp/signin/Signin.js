import React, { Component } from "react";
import {
  Alert,
  Button,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../../firebase";

function Signin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifire = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");

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
        console.log(userId);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText2}>Farmers</Text>
      <Text style={styles.titleText}>Enter number to continue</Text>
      <TextInput
        // value="Phone Number"
        keyboardType="number-pad"
        placeholder="+260 7XX XXX XXX"
        placeholderTextColor="black"
        style={styles.input}
        autoCompleteType="tel"
        onChangeText={setPhoneNumber}
      />

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
      <TouchableOpacity style={styles.buttonLogin} onPress={confirmCode}>
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifire}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={true | false /* experimental */}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
    // backgroundColor: '#ecf0f1',
    alignItems: "center",
    marginBottom: 140,
    padding: 30,
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 9,
    borderColor: "rgb(163, 252, 165 )",
  },
  titleText: {
    fontSize: 18,
    color: "black",
  },
  titleText2: {
    marginBottom: 80,
    fontSize: 22,
    color: "black",
  },
  input: {
    fontSize: 10,
    padding: 5,
    margin: 3,
    width: 130,
    textAlign: "center",
    backgroundColor: "#ecf0f1",
    //   borderWidth: .5,
    borderRadius: 5,
    borderColor: "black",
  },
  button: {
    fontSize: 6,
    //   backgroundColor: 'lightgrey',
    padding: 3,
    margin: 3,
    marginTop: 50,
    borderWidth: 0.3,
    borderRadius: 5,
  },
  buttonLogin: {
    fontSize: 6,
    backgroundColor: "rgb(163, 252, 165 )",
    padding: 12,
    margin: 3,
    borderRadius: 5,
  },
});
export default Signin;
