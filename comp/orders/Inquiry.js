import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useGetUser from "../crud/useGetUser";

const Inquiry = ({ route }) => {
  const navigation = useNavigation();
  let data = route.params.data;
  let user = useGetUser(data.u_id).docs;
  const [bags, setBags] = useState(null);

  console.log(data)
  function sendInquiry() {
    let inquiry = {
      buyer: firebase.auth().currentUser.uid,
      createdAt: new Date(Date.now()).toString(),
      price: data.price,
      produce: data.produce,
      quant: bags,
      status:"pending",
      seller: data.u_id,
    };
    firebase
      .firestore()
      .collection("inquires")
      .add(inquiry)
      .then(() => {
        console.log("Inquiry sent");
        sendPushNotification(user.token)
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: "Inquiry",
      body: `You have an inquiry for` + bags+ " of " + data.produce,
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: "100%",
        padding: SIZES.padding,
      }}
    >
      <View style={{ backgroundColor: COLORS.white, flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: COLORS.dark2,
            marginHorizontal: 5,
            flex: 1,
            padding: SIZES.padding * 2,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {data.produce}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h6 }}>
            {data.produce_category}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.black,
            marginHorizontal: 5,
            flex: 1,
            padding: SIZES.padding * 2,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{user.name}</Text>
          <Text style={{ color: COLORS.white, ...FONTS.h6 }}>{user.type}</Text>
        </View>
      </View>
      {/* <View>
                <Text>Am offering to pay K15kwacha for 1 KG, i will need 10 bags of 5KG</Text>
            </View> */}
      <View style={{ padding: SIZES.padding }}>
        <Text style={{ ...FONTS.h4 }}>Make offer</Text>
        <Text>
          My current price for {data.quantity} {data.unit} of {data.produce} is ZMW {data.price} {"\n"}
        </Text>
        <Text>How many bags of {data.produce} do you need?</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="e.g. 10"
          onChangeText={(value) => setBags(value)}
          style={{
            padding: SIZES.padding,
            borderRadius: 5,
            marginVertical: 10,
            borderWidth: 0.2,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.black,
          marginTop: 40,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onPress={() => sendInquiry()}
      >
        <Text style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}>
          Make Offer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Inquiry;
