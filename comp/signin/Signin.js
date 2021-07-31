import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../../firebase";

function Signin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifire = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");

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
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifire}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={false}
      />
      <Text style={styles.titleText2}>Welcome back,</Text>
      <Text style={styles.titleText}>Enter your phone number to continue</Text>
      <TextInput
        // value="Phone Number"
        keyboardType="number-pad"
        placeholder="097XX XXX XXX"
        placeholderTextColor={COLORS.Gray}
        style={styles.input}
        autoCompleteType="tel"
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={sendVerification}>
        <Text style={styles.buttonText}>Get OTP </Text>
      </TouchableOpacity>
      <View style={{ height: 20 }}></View>
      <TextInput
        // value="OTP"
        keyboardType="number-pad"
        placeholder="Enter OTP"
        placeholderTextColor="black"
        onChangeText={setCode}
        style={styles.input}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={confirmCode}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLoginText: {
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.h5,
  },
  buttonLogin_: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding * 3,
    justifyContent: "center",
  },
  titleText: {
    ...FONTS.h5,
    color: COLORS.black,
  },
  titleText2: {
    marginBottom: 80,
    ...FONTS.h1,
    color: "black",
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "right",
    paddingHorizontal:20,
    ...FONTS.h4,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth:1,
    borderColor:COLORS.lightGray
  },
  button: {
    padding: 3,
    margin: 3,
    marginTop: 50,
  },
  buttonLogin: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 10,
  },
});
export default Signin;
