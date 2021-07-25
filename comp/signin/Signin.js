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

export default function Signin() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText2}>Farmers</Text>
      <Text style={styles.titleText}>Login to continue</Text>
      <TextInput
        // value="Phone Number"
        keyboardType="number-pad"
        placeholder="+260 7XX XXX XXX"
        placeholderTextColor="black"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get OTP </Text>
      </TouchableOpacity>

      <TextInput
        // value="OTP"
        keyboardType="number-pad"
        placeholder="Enter OTP"
        placeholderTextColor="black"
        style={styles.input}
      />
      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.buttonText}>Login </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
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
