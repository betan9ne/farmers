import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  FlatList,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";

const EditProduct = ({ route }) => {
  let data = route.params.item;
  console.log(data.price);
  const [price, setPrice] = useState(data.price);
  const [items, setItems] = useState(data.items);
  const [delivery, setDelivery] = useState(data.delivery);
  const [doc, setDocs] = useState(null);
  const [subItems, setSubItems] = useState(null);
  const [subItem, setSubItem] = useState(data.product_category);
  const [ItemName, setItemname] = useState(data.produce);
  const [url, setUrl] = useState(null);
  const [modalVisible, setModalVisibility] = useState(false);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setImageUrl] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("produce")
      .get()
      .then((doc) => {
        let data = [];
        doc.docs.forEach((e) => {
          let asd = {
            id: e.id,
            ...e.data(),
          };
          data.push(asd);
        });
        setDocs(data);
      });
  }, []);

  function displayItems(item) {
    console.log(item.name);
    setItemname(item.name);
    setSubItem(null);
    setSubItems(item.items);
  }

  function updateProduce() {
    let asd = {
      updatedAt: new Date(Date.now()).toString(),
      price: price,
      delivery: delivery,
    };
    firebase
      .firestore()
      .collection("products")
      .doc(data.id)
      .update(asd)
      .then(() => {
        navigation.navigate("manageProduct");
      });
  }

    function updateProduce(){
        let asd = {
            updatedAt: new Date(Date.now()).toString(),
            price: price,
            items:items,
            delivery: delivery,             
        }
        firebase.firestore().collection("products").doc(data.id)
        .update(asd).then(()=>{
            navigation.navigate("manageProduct")
        })
    }
  return (
    <ScrollView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View
        style={{ backgroundColor: COLORS.white, padding: SIZES.padding * 2 }}
      >
        <Text style={{ ...FONTS.h5 }}>
          Update the price and stock of your item below.
        </Text>

        <View style={{}}>
          <Text style={{ ...FONTS.h5, marginTop: 20, color: COLORS.black }}>
            Price
          </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="How much does it cost"
            defaultValue={data.price}
            onChangeText={(value) => setPrice(value)}
            style={{
              padding: SIZES.padding * 2,
              borderWidth: 0.4,
              borderRadius: 10,
            }}
          />
          <Text style={{ ...FONTS.h5, marginTop: 10 }}>Items Available</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="What do you have available"
            defaultValue={data.items}
            onChangeText={(value) => setItems(value)}
            style={{
              padding: SIZES.padding * 2,
              borderWidth: 0.4,
              borderRadius: 10,
            }}
          />
          <Text style={{ ...FONTS.h5, marginTop: 10 }}>
            Do you offer delivery?
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => setDelivery("0")}
              style={{
                flex: 1,
                borderRadius: 10,
                marginHorizontal: 5,
                backgroundColor:
                  delivery === "0" ? COLORS.secondary : COLORS.black,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  textAlign: "center",
                  padding: SIZES.padding,
                  ...FONTS.h5,
                }}
              >
                Stationary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDelivery("1")}
              style={{
                flex: 1,
                borderRadius: 10,
                marginHorizontal: 5,
                backgroundColor:
                  delivery === "1" ? COLORS.secondary : COLORS.black,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  textAlign: "center",
                  padding: SIZES.padding,
                  ...FONTS.h5,
                }}
              >
                Mobile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => updateProduce()}
          style={{
            backgroundColor: COLORS.black,
            marginTop: 40,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}
          >
            Update Product
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
  },
});
export default EditProduct;
