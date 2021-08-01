import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import firebase from "../..//firebase";
import useGetInquiries from "../crud/useGetInquiries";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

function Inquiries() {
  const navigation = useNavigation();
  let inquiries = useGetInquiries().docs;
  console.log(inquiries);

  function updateStatus(id, status) {
    firebase
      .firestore()
      .collection("inquires")
      .doc(id)
      .update({ status: status })
      .then(() => {
        console.log("status updated");
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }

  const layout = useWindowDimensions();
  const [index, setINdex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Accepted" },
  ]);

  const renderInquiries = ({ item }) => (
    <View
      style={{
        paddingVertical: 10,
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
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            flex: 1,
            paddingHorizontal: 20,
            ...FONTS.h5,
            color: COLORS.darkgray,
          }}
        >
          Quantity: {item.quant}
        </Text>
        <Text
          style={{
            flex: 1,
            paddingHorizontal: 20,
            ...FONTS.h5,
            color: COLORS.darkgray,
          }}
        >
          Price:{item.price}
        </Text>
      </View>
      <Text
        style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.darkgray }}
      >
        Request sent on {item.createdAt.slice(0, 16)}
      </Text>
      <Text>{item.status}</Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => updateStatus(item.id, "accepted")}
        >
          <Text style={styles.buttonText1}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => updateStatus(item.id, "rejected")}
        >
          <Text style={styles.buttonText2}>Deny</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Pending = () => {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
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
      </View>
    );
  };

  const Accepted = () => {
    return <View style={{ flex: 1, backgroundColor: COLORS.secondary }}></View>;
  };
  const renderScene = SceneMap({
    first: Pending,
    second: Accepted,
  });
  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: COLORS.black, margin: 8 }}>
              {route.title}
            </Text>
          )}
          style={{ backgroundColor: COLORS.white }}
          indicatorStyle={{ backgroundColor: COLORS.secondary }}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setINdex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  button1: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
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
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
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
