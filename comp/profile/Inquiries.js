import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import firebase from "../..//firebase";
import useGetInquiries from "../crud/useGetInquiries";

function Inquiries(props) {
  const navigation = useNavigation();
  let inquiries = useGetInquiries().docs;
  console.log(inquiries);

  const renderInquiries = ({ item }) => (
    <TouchableOpacity
      //   onPress={() => navigation.navigate("inquiries", { item })}
      style={{
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: COLORS.white,
      }}
    ><Text
        style={{ paddingHorizontal: 20, ...FONTS.h4, color: COLORS.secondary }}
      >{item.produce}
      </Text>
      <View style={{flexDirection:"row"}}>
          <Text style={{flex:1, paddingHorizontal: 20, ...FONTS.h5, color: COLORS.darkgray }}
          >Quantity: {item.quant}</Text>
          <Text style={{flex:1, paddingHorizontal: 20, ...FONTS.h5, color: COLORS.darkgray }}
          >Price:{item.price}</Text>
      </View>      
      <Text
        style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.darkgray }}
      >Request sent on {item.createdAt.slice(0, 16)}
      </Text>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.buttonText1}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText2}>Deny</Text>
      </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: SIZES.padding * 2, height: SIZES.height }}>
      <Text style={{ ...FONTS.h5, marginVertical: 10 }}>
        You can accept or deny your incoming requests from here
      </Text>
      {inquiries && (
        <FlatList
          data={inquiries}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderInquiries}
          contentContainerStyle={{}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button1: {
    marginHorizontal:10,
    marginTop: 10,
    flex:1,
    ...FONTS.h4,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
  },
  buttonText1: {
    color: COLORS.white,
    textAlign: "center",
  },
  button2: {
    marginHorizontal:10,
    marginTop: 10,
    flex:1,
    ...FONTS.h4,
    textAlign: "center",
    borderRadius: 5,
   
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
  },
  buttonText2: {
    color: COLORS.white,
    textAlign: "center",
  },
});

export default Inquiries;
