import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import useGetUser from "../crud/useGetUser";

function profile() {
  const navigation = useNavigation();
  let user = useGetUser(firebase.auth().currentUser.uid).docs;
  //buyer, farmer, transporter
  // console.log(user);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
      });
  };

  return (
    <ScrollView
      style={{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        marginBottom: 50,
        paddingBottom: 50,
      }}
    >
      <View style={{ padding: SIZES.padding * 2, height: 60 }}>
        <Text style={{ ...FONTS.h2 }}>Profile</Text>
      </View>
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h2, fontWeight: "900", textAlign: "center" }}>
          {user && user.name}
        </Text>
        <View
          style={{
            marginTop: 10,
            justifyCOntent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: COLORS.secondary,
              fontWeight: "900",
              paddingHorizontal: 20,
              borderRadius: 10,
              color: COLORS.white,
              paddingVertical: 10,
              ...FONTS.h5,
            }}
          >
            @{user && user.username}
          </Text>
          <View style={{flexDirection:"row", marginTop:10}}>
          <Text
            style={{
              backgroundColor: COLORS.white,
              marginHorizontal: 10,
              color: COLORS.dark,
              padding: 5, flex:1,
              ...FONTS.h6,
            }}
          >
            {user && user.gender}
          </Text>
          <Text
            style={{
              fontWeight: "900",
              marginHorizontal: 10,
              color: COLORS.dark,
              padding: 5, flex:1,
              ...FONTS.h6,
            }}
          >{user && user.district}
          </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              ...FONTS.h5,
              fontWeight: "900",
            }}
          >
            {user && user.province}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              ...FONTS.h5,
              fontWeight: "900",
            }}
          >
            {user && user.phone}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              ...FONTS.h5,
              fontWeight: "900",
            }}
          >
            {user && user.type}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("manageProduct")}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.black,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              padding: SIZES.padding * 4,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            <Feather name="check-square" size={24} color="white" />
            {"\n\n"}Manage Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("addProduct")}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.secondary,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              padding: SIZES.padding * 4,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            <Feather name="plus" size={24} color="white" />
            {"\n\n"}Add Product
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("updateProfile", { user })}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.black,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              padding: SIZES.padding * 4,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            <Feather name="user" size={24} color="white" />
            {"\n\n"}Update Profile
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.black,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Inquiries", { user })}
            style={{
              flex: 1,
              marginHorizontal: 5,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.black,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h4,
                padding: SIZES.padding * 4,
                textAlign: "center",
                fontWeight: "900",
              }}
            >
              <Feather name="bell" size={24} color="white" />
              {"\n\n"}Inquiries
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.black,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              padding: SIZES.padding * 4,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            <Feather name="info" size={24} color="white" />
            {"\n\n"}About FStore
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => logout()}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.dark,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              padding: SIZES.padding * 4,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            <Feather name="log-out" size={24} color="white" />
            {"\n\n"}Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default profile;
