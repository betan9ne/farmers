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

  const renderInquiries = ({ item }) => (
    <TouchableOpacity
      //   onPress={() => navigation.navigate("inquiries", { item })}
      style={{
        paddingVertical: 10,
        width: SIZES.width,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: COLORS.white,
      }}
    >
      <Text
        style={{ paddingHorizontal: 20, ...FONTS.h4, color: COLORS.secondary }}
      >
        {item.produce}
      </Text>
      <Text
        style={{ paddingHorizontal: 20, ...FONTS.h6, color: COLORS.darkgray }}
      >
        Quantity: {item.quant}
      </Text>
      <Text
        style={{ paddingHorizontal: 20, ...FONTS.h6, color: COLORS.darkgray }}
      >
        Price: {item.price}
      </Text>
      <Text
        style={{ paddingHorizontal: 20, ...FONTS.h6, color: COLORS.darkgray }}
      >
        Time: {item.createdAt.slice(0, 16)}
      </Text>
      <View style={styles.btncontainer}>
        <TouchableOpacity
          onPress={() => updateInquiry()}
          style={styles.button1}
        >
          <Text style={styles.buttonText1}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateInquiry()}
          style={styles.button2}
        >
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
          data={inquiries.slice(0, 5)}
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
  btncontainer: {
    flexDirection: "row",
  },
  button1: {
    width: "30%",
    marginLeft: "10%",
    marginTop: 10,
    textAlign: "center",
    borderRadius: 5,
    bottom: 0,
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding * 1,
  },
  buttonText1: {
    color: COLORS.white,
    textAlign: "center",
  },
  button2: {
    width: "30%",
    marginLeft: "10%",
    marginTop: 10,
    textAlign: "center",
    borderRadius: 5,
    bottom: 0,
    backgroundColor: COLORS.black,
    padding: SIZES.padding * 1,
  },
  buttonText2: {
    color: COLORS.white,
    textAlign: "center",
  },
});

export default Inquiries;
