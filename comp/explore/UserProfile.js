import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, ScrollView, Image, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons"
import MasonryList from '@react-native-seoul/masonry-list'
import useGetUserProduce from '../crud/useGetUserProduce'
import useGetViewCount from '../crud/useGetViewCount'

const UserProfile = ({route}) => {
    let user = route.params.item
    let data = useGetUserProduce(user.id).docs
    let counter = useGetViewCount(firebase.auth().currentUser.uid)
     const navigation = useNavigation()

    const renderItem = ({ item }) => (           
        <TouchableOpacity  onPress={()=>navigation.navigate("viewProduce",{item})} key={item.id} style={{paddingVertical:10, height:280, borderRadius:10, margin:5, backgroundColor:COLORS.white}}>
             <Image  style={{width:"100%", height:220, borderRadius:10, resizeMode:'cover'}}
        source={{
          uri: item.images,
        }}
      />
        <View style={{width:"85%", marginTop:-40, paddingVertical:10, marginLeft:10, borderRadius:10, backgroundColor:COLORS.black}}>
            <Text style={{paddingHorizontal:20, ...FONTS.h5, color:COLORS.white}}>{item.produce}</Text>
            <Text style={{paddingHorizontal:20, ...FONTS.h6, color:COLORS.white}}>{item.produce_category}</Text>
            <Text style={{paddingHorizontal:20, ...FONTS.h6, color:COLORS.secondary}}>Price: {item.price}</Text>
        </View>
        </TouchableOpacity>
    )
    return (
    <ScrollView style={{padding:SIZES.padding,backgroundColor:COLORS.white, marginBottom:0, height:SIZES.height}}>
            <View style={{}}>
                <Text style={{...FONTS.h2, fontWeight:"900", textAlign:"center"}}>{user.name}</Text>
                <View style={{marginTop:10, justifyCOntent:"center", alignItems:"center"}}>
                    <Text style={{ backgroundColor:COLORS.secondary, fontWeight:"900", paddingHorizontal:20, borderRadius:10, color:COLORS.white, paddingVertical:5, ...FONTS.h5}}>@{user.username}</Text>
                    <Text style={{ backgroundColor:COLORS.lightGray, fontWeight:"900", marginHorizontal:10, marginVertical:10, borderRadius:5, color:COLORS.dark, padding:10, ...FONTS.h6}}>{user.district}</Text>
                </View>
        
                <View style={{flexDirection:"row", marginVertical:20}}>
                    <Text style={{flex:1, textAlign:"center", ...FONTS.h5, fontWeight:"900"}}>{user.province}</Text>        
                    <Text style={{flex:1, textAlign:"center", ...FONTS.h5, fontWeight:"900"}}>{user.phone}</Text>
                    <Text style={{flex:1, textAlign:"center", fontWeight:"900", ...FONTS.h5 }}>{user.type}</Text>
                </View>
            </View>
            <Text style={{textAlign:"center", marginBottom:10, fontSize:14, fontWeight:"900"}}><Feather name="eye" color="black" size={18} /> {counter}</Text>
           <Text style={{marginBottom:10, textAlign:"center", color:COLORS.secondary, ...FONTS.h4}}>{data && data.length} Items</Text>
            <MasonryList 
                data={data}
                keyExtractor={item => `${item.id}`}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
            />
            <View style={{height:30, backgroundColor:COLORS.white}}></View>
    </ScrollView>
    )
}

export default UserProfile
