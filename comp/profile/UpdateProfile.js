import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useGetUser from "../crud/useGetUser";

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

  // function to request for a verification code
  let userId = firebase.auth().currentUser.uid;
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

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/profile.png")}
        style={styles.image}
      />
      <Text style={styles.txth1}>Lets update your profile</Text>
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
          <TextInput
            keyboardType="default"
            placeholder="Male"
            placeholderTextColor={COLORS.Gray}
            style={styles.input}
            autoCompleteType="name"
            onChangeText={setgender}
            defaultValue={user && user.gender}
          />
        </View>

        <View style={styles.altContainer}>
          <Text style={styles.txth3}>Province</Text>
          <TextInput
            keyboardType="default"
            placeholder="Lusaka / Ndola"
            placeholderTextColor={COLORS.Gray}
            style={styles.input}
            autoCompleteType="name"
            onChangeText={setprovince}
            defaultValue={user && user.province}
          />

          <Text style={styles.txth3}>District</Text>
          <TextInput
            keyboardType="default"
            placeholder="Lusaka / kabombo"
            placeholderTextColor={COLORS.Gray}
            style={styles.input}
            autoCompleteType="name"
            onChangeText={setdistrict}
            defaultValue={user && user.district}
          />

          <Text style={styles.txth3}>User type</Text>
          <TextInput
            keyboardType="default"
            placeholder="Buyer / seller / Transport / Store"
            placeholderTextColor={COLORS.Gray}
            style={styles.input}
            autoCompleteType="name"
            onChangeText={setusertype}
            defaultValue={user && user.type}
          />
        </View>
      </View>

      {/* </ImageBackground> */}
      <TouchableOpacity style={styles.button1} onPress={update}>
        <Text style={styles.buttonText1}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonText1: {
    textAlign: "left",
  },
  buttonText2: {
    textAlign: "right",
  },
  miniContainer: {
    padding: SIZES.padding * 2,
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    left: 0,
    right: 0,
  },
  detailsContainer: {
    padding: SIZES.padding * 2,
    flexDirection: "row",
    left: 0,
    right: 0,
  },
  personalContainer: {
    flex: 0.5,
    textAlign: "left",
    backgroundColor: "white",
    // padding: SIZES.padding * 2,
  },
  altContainer: {
    flex: 0.5,
    textAlign: "left",
    backgroundColor: "white",
    // padding: SIZES.padding * 2,
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
    width: "60%",
    textAlign: "center",
    marginBottom: "10%",
    marginTop: "5%",
  },
  txth3: {
    ...FONTS.h4,
    textAlign: "center",
  },
  input: {
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
});

export default updateProfile;
