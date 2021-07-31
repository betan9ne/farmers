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

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} style={styles.bgimage}> */}
      <Image source={require("./../../assets/img.png")} style={styles.image} />
      <Text style={styles.txth1}>Welcome!</Text>
      <Text style={styles.txth2}>
        {" "}
        Farming should be easy and convenient and thats why we believe this
        platform is the best place for you.
      </Text>
      
      <View style={styles.miniContainer}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("Register")}
        ><Text style={{textAlign:"right", color:COLORS.white, ...FONTS.h4}}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("Login")}
        ><Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
       alignItems: "center",
    justifyContent: "center",
    backgroundColor:COLORS.white
  },
  buttonText:{
    textAlign:"right",
    color:COLORS.white, ...FONTS.h4
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
    flex: 0.5,
    textAlign: "right",
     padding: SIZES.padding * 2,
     backgroundColor:COLORS.primary,
     marginHorizontal:5,
     borderRadius:10
  },
  button2: {
    flex: 0.5,
    textAlign: "right",
     padding: SIZES.padding * 2,
     backgroundColor:COLORS.secondary,
     marginHorizontal:5,
     borderRadius:10
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
