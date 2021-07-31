import React, {useEffect} from "react";

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
  let day = new Date().getDay()
  const[image, setImage]= React.useState()
   console.log(day)

   let images = [require(`./../../assets/img0.png`),
   require(`./../../assets/img1.png`),
   require(`./../../assets/img2.png`),
   require(`./../../assets/img3.png`),
   require(`./../../assets/img4.png`),
   require(`./../../assets/img5.png`),
   require(`./../../assets/img6.png`)]

  return (
    <View style={styles.container}>
     <ImageBackground source={images[day]} resizeMode="cover" style={{flex:1, justifyContent:"center"}}>
      <View style={{ 
     position:"absolute", backgroundColor:COLORS.white, bottom:-10, padding:SIZES.padding*2, borderRadius:10, left:0, right:0 
   }}>

<Text style={styles.txth1}>Welcome{"\n"} to Farms Market</Text>
      <Text style={styles.txth2}>
        {" "}
        Farming should be easy and convenient and thats why we believe this
        platform is the best place for you.
      </Text>

     <View style={{flexDirection: "row",}}>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex:1,
  marginBottom:30
  },
  buttonText:{
    textAlign:"right",
    color:COLORS.white, ...FONTS.h4
  },
  miniContainer: {
    padding: SIZES.padding * 2,
   
  },
  button1: {
    flex: 0.5,
    textAlign: "right",
     padding: SIZES.padding * 2,
     backgroundColor:COLORS.primary,
    
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
    marginVertical:20,       
  },
  bgimage: {},
});

export default Welcome;
