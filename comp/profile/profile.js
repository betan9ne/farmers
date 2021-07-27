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
  console.log(user);

  function createUsers() {
    const names = [
      "Aaran",
      "Aaren",
      "Aarez",
      "Aarman",
      "Aaron",
      "Aaron-James",
      "Aarron",
      "Aaryan",
      "Aaryn",
      "Aayan",
      "Aazaan",
      "Abaan",
      "Abbas",
      "Abdallah",
      "Abdalroof",
      "Abdihakim",
      "Abdirahman",
      "Abdisalam",
      "Abdul",
      "Abdul-Aziz",
      "Abdulbasir",
      "Abdulkadir",
    ];
    const lastName = [
      "Abdulkarem",
      "Abdulkhader",
      "Abdullah",
      "Abdul-Majeed",
      "Abdulmalik",
      "Abdul-Rehman",
      "Abdur",
      "Abdurraheem",
      "Abdur-Rahman",
      "Abdur-Rehmaan",
      "Abel",
      "Abhinav",
      "Abhisumant",
      "Abid",
      "Abir",
      "Abraham",
      "Abu",
      "Abubakar",
      "Ace",
      "Adain",
      "Adam",
      "Adam-James",
      "Addison",
      "Addisson",
      "Adegbola",
      "Adegbolahan",
      "Aden",
      "Adenn",
      "Adie",
      "Adil",
      "Aditya",
      "Adnan",
      "Adrian",
      "Adrien",
      "Aedan",
      "Aedin",
      "Aedyn",
      "Aeron",
    ];
    const gender = ["Male", "Female"];
    const us_cities = [
      "Abbeville",
      "Abbotsford",
      "Aberdeen",
      "Abilene",
      "Abingdon",
      "Abington",
      "Absecon",
      "Acampo",
      "Accokeek",
      "Achille",
      "Acme",
      "Acton",
      "Acushnet",
      "Acworth",
      "Ada",
      "Adair",
      "Adairsville",
      "Adams",
      "Adams Run",
      "Adamstown",
      "Adamsville",
      "Addieville",
      "Addis",
      "Addison",
      "Addyston",
      "Adel",
      "Adelanto",
      "Adena",
      "Adkins",
      "Adrian",
      "Advance",
      "Afton",
      "Agawam",
      "Agoura Hills",
      "Agra",
      "'Aiea",
      "Aiken",
      "Ailey",
      "Airville",
      "Ajo",
      "Akhiok",
      "Akron",
      "Alabaster",
      "Alameda",
      "Alamo",
      "Alamogordo",
      "Albany",
      "Albemarle",
      "Albert City",
      "Albert Lea",
      "Albertson",
      "Albertville",
      "Albia",
      "Albion",
      "Albrightsville",
      "Albuquerque",
      "Alburtis",
      "Alcoa",
      "Alden",
      "Aldie",
      "Aledo",
      "Alexander",
      "Alexander City",
      "Alexandria",
      "Alfred",
      "Alger",
      "Algoma",
      "Algonquin",
      "Alhambra",
      "Alice",
      "Aliceville",
      "Aliquippa",
      "Aliso Viejo",
      "Allegan",
      "Allen",
      "Allendale",
    ];
    const type = ["Buyer", "Farmer", "Transporter", "Store"];
    for (let id = 0; id < 5; id++) {
      const random = Math.floor(Math.random() * gender.length);
      const randomName = Math.floor(Math.random() * names.length);
      const randomLastName = Math.floor(Math.random() * lastName.length);
      const radnomCity = Math.floor(Math.random() * us_cities.length);
      const randomType = Math.floor(Math.random() * type.length);
      let asd = {
        name: names[randomName] + " " + lastName[randomLastName],
        username: names[randomName] + "_" + lastName[randomLastName] + id,
        gender: gender[random],
        district: us_cities[radnomCity],
        province: "Lusaka",
        phone: "097831453" + id,
        type: type[randomType],
      };
      firebase
        .firestore()
        .collection("users")
        .add(asd)
        .then(() => {
          console.log("added");
        });
    }
  }

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
        marginBottom: 80,
        paddingBottom: 90,
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
          <Text
            style={{
              backgroundColor: COLORS.white,
              marginHorizontal: 10,
              color: COLORS.dark,
              padding: 5,
              ...FONTS.h6,
            }}
          >
            {user && user.gender}
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.lightGray,
              fontWeight: "900",
              marginHorizontal: 10,
              color: COLORS.dark,
              padding: 5,
              ...FONTS.h6,
            }}
          >
            {user && user.district}
          </Text>
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
          onPress={() => navigation.navigate("updateProfile")}
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
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              padding: SIZES.padding * 4,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            <Feather name="heart" size={24} color="white" />
            {"\n\n"}Rate the App
          </Text>
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
