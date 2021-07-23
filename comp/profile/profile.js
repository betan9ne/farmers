import React,{useState, useEffect} from 'react'
import {Text, View, ScrollView, TouchableOpacity, TextInput, Button} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons"

function profile() {
    const navigation = useNavigation()
    //buyer, farmer, transporter
    return (
        <ScrollView style={{padding:SIZES.padding,backgroundColor:COLORS.white, marginBottom:80, height:SIZES.height}}>
        <View style={{padding:SIZES.padding*2, height:60}}>
        <Text style={{...FONTS.h2}}>Profile</Text>
    </View>
    <View style={{padding: SIZES.padding*2,}}>
        <Text style={{...FONTS.h3, fontWeight:"900", textAlign:"center"}}>Chisomo Mwanza</Text>
        <View style={{marginTop:10, justifyCOntent:"center", alignItems:"center"}}>
            <Text style={{ backgroundColor:COLORS.white, marginHorizontal:10, color:COLORS.dark, padding:5, ...FONTS.h6}}>Male</Text>
            <Text style={{ backgroundColor:COLORS.lightGray, fontWeight:"900", marginHorizontal:10, color:COLORS.dark, padding:5, ...FONTS.h6}}>Chongwe</Text>
        </View>
        
        <View style={{flexDirection:"row", marginVertical:20}}>
            <Text style={{flex:1, textAlign:"center", ...FONTS.h5, fontWeight:"900"}}>Lusaka</Text>        
            <Text style={{flex:1, textAlign:"center", ...FONTS.h5, fontWeight:"900"}}>0978314539</Text>
            <Text style={{flex:1, textAlign:"center", ...FONTS.h5, fontWeight:"900"}}>Buyer</Text>
        </View>
    </View>
    
    <View style={{flexDirection:"row", marginVertical:5,}}>
        <View style={{flex:1, marginHorizontal:5, borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
            <Text style={{color:COLORS.white, ...FONTS.h4, padding:SIZES.padding*4, textAlign:"center", fontWeight:"900"}}><Feather name="check-square" size={24} color="white"/>{"\n\n"}Manage Products</Text>
        </View> 
        <TouchableOpacity onPress={()=>navigation.navigate("addProduct")} style={{flex:1, marginHorizontal:5, borderRadius:10, justifyContent:"center", alignItems:"flex-end", backgroundColor:COLORS.secondary}}>
            <Text style={{color:COLORS.white, ...FONTS.h4, padding:SIZES.padding*4, textAlign:"center", fontWeight:"900"}}><Feather name="plus" size={24} color="white"/>{"\n\n"}Add Product</Text>
        </TouchableOpacity>            
    </View>   
    
    <View style={{flexDirection:"row", marginVertical:5,}}>
        <View style={{flex:1, marginHorizontal:5, borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
            <Text style={{color:COLORS.white, ...FONTS.h4, padding:SIZES.padding*4, textAlign:"center", fontWeight:"900"}}><Feather name="user" size={24} color="white"/>{"\n\n"}Update Profile</Text>
        </View> 
        <View style={{flex:1, marginHorizontal:5, borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
            <Text style={{color:COLORS.white, ...FONTS.h4, padding:SIZES.padding*4, textAlign:"center", fontWeight:"900"}}><Feather name="heart" size={24} color="white"/>{"\n\n"}Rate the App</Text>
        </View>            
    </View>

    <View style={{flexDirection:"row", marginVertical:5,}}>
        <View style={{flex:1, marginHorizontal:5, borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
            <Text style={{color:COLORS.white, ...FONTS.h4, padding:SIZES.padding*4, textAlign:"center", fontWeight:"900"}}><Feather name="info" size={24} color="white"/>{"\n\n"}About FStore</Text>
        </View> 
        <View style={{flex:1, marginHorizontal:5, borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.dark}}>
            <Text style={{color:COLORS.white, ...FONTS.h4, padding:SIZES.padding*4, textAlign:"center", fontWeight:"900"}}><Feather name="log-out" size={24} color="white"/>{"\n\n"}Logout</Text>
        </View>            
    </View>
    </ScrollView>
    )
}

export default profile