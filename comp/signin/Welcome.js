import React from "react";

import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { COLORS, FONTS, SIZES } from "./../../constants";

function Welcome() {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} style={styles.bgimage}> */}
      <Image source={require("./../../assets/img.png")} style={styles.image} />
      <Text style={styles.txth1}> Welcome!</Text>
      <Text style={styles.txth2}>
        {" "}
        Farming should be easy and convenient and thats why we believe this
        platform is the best place for you.
      </Text>
      {/* </ImageBackground> */}
      <View style={styles.miniContainer}>
        <TouchableOpacity style={styles.button1} onPress={""}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={""}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  miniContainer: {
    padding: SIZES.padding * 2,
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button1: {
    flex: 0.9,
    textAlign: "left",
    backgroundColor: "rgb(240,240,240)",
    padding: SIZES.padding * 2,
  },
  button2: {
    flex: 0.1,
    textAlign: "right",
    backgroundColor: "rgb(240,240,240)",
    padding: SIZES.padding * 2,
  },
  image: {
    marginTop: "20%",
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
    marginBottom: "30%",
    marginTop: "5%",
  },
  bgimage: {},
});

export default Welcome;
