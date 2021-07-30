import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";

import { SIZES, FONTS, COLORS } from "../../constants";
import useGetFarmers from "../crud/useGetFamers";
import { useNavigation } from "@react-navigation/native";
import useGetCategories from "../crud/useGetCategories";
import useGetAllProducts from "../crud/useGetAllProducts";

function Explore() {
  let farmers = useGetFarmers().docs;
  let categories = useGetCategories().docs;
  const navigation = useNavigation();

  let products = useGetAllProducts().docs;

  const renderFarmers = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("userProfile", { item })}
      style={{
        paddingVertical: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 0,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.secondary,
        borderRadius: 10,
        backgroundColor: COLORS.black,
      }}
    >
      <View>
        <Text
          style={{ paddingHorizontal: 20, color: COLORS.white, ...FONTS.h4 }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            borderRadius: 10,
            color: COLORS.secondary,
            ...FONTS.h5,
          }}
        >
          {item.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategories = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("viewProduce", { item })}
      key={item.id}
      style={{
        paddingVertical: 10,
        height: 280,
        borderRadius: 10,
        margin: 5,
        backgroundColor: COLORS.white,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 220,
          borderRadius: 10,
          resizeMode: "cover",
        }}
        source={{
          uri: item.images,
        }}
      />
      <View
        style={{
          width: "70%",
          marginTop: -20,
          paddingVertical: 10,
          marginLeft: 10,
          borderRadius: 10,
          backgroundColor: COLORS.black,
        }}
      >
        <Text
          style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.white }}
        >
          {item.produce}
        </Text>
        <Text
          style={{ paddingHorizontal: 20, ...FONTS.h6, color: COLORS.white }}
        >
          {item.produce_category}
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            ...FONTS.h6,
            color: COLORS.secondary,
          }}
        >
          Price: {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View
        style={{
          padding: SIZES.padding * 2,
          height: "100%",
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={{ ...FONTS.h2, padding: SIZES.padding }}>Explore</Text>

            <View style={{marginTop:30}}>
                 <Text style={{...FONTS.h4, marginBottom:20}}>Spotlight</Text>
                {farmers &&  <FlatList
            data={farmers.slice(0,5)}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderFarmers}
                contentContainerStyle={{                    
                }}
            />  }
            <TouchableOpacity style={{marginTop:10,}} onPress={()=>navigation.navigate("vendors")}>
                <Text style={{backgroundColor:COLORS.white, color:COLORS.black, borderWidth:0.2, borderColor:COLORS.black, paddingHorizontal:SIZES.padding*2, paddingVertical: 10, borderRadius:10, ...FONTS.h5, alignSelf:"flex-end"}}>View All</Text>
            </TouchableOpacity>
            </View>

        <View style={{ marginTop: 30 }}>
          {
            //produce with the most farmers
          }
          <Text style={{ ...FONTS.h4 }}>Discover</Text>
          {products && (
            <FlatList
              data={products}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderCategories}
              contentContainerStyle={{}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default Explore;
