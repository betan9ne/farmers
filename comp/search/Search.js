import React,{useState, useRef, useEffect} from 'react'
import {Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {Feather} from "@expo/vector-icons"
import {useNavigation} from '@react-navigation/native'
import useGetCategories from '../crud/useGetCategories'

function Search() {

    let categories = useGetCategories().docs
    console.log(categories)
    const searchBOx = useRef()
    const searchButton = useRef()

    const navigation = useNavigation()
    const[search, setSearch] = useState(null)
    const[status, setStatus] = useState(false)
    
    function takeFocus(){
        searchBOx.current.focus()
        setStatus(true)
        console.log(status)
    }

    const renderItem = ({ item }) => (           
        <TouchableOpacity style={{paddingVertical:10,marginHorizontal:5, borderColor:COLORS.lightGray, borderRadius:10, backgroundColor:COLORS.white, borderWidth:0.4}}>
            <Text style={{paddingHorizontal:20, color:COLORS.dark, ...FONTS.h5}}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={{flex:1}}
      >
        <View style={{padding:SIZES.padding,backgroundColor:COLORS.white, height:SIZES.height}}>
             <View style={{padding:SIZES.padding*2,}}>
        <Text style={{...FONTS.h2}}>Search</Text>
        <View style={{flexDirection:"row", width:"100%"}}>
            <TextInput returnKeyType="search" ref={searchBOx}  placeholder="search for something" onChangeText={(value)=>setSearch(value)} style={{padding: SIZES.padding, borderRadius:10, borderColor:COLORS.lightGray, borderWidth:0.4, marginRight:10, flex:1}} />
            <TouchableOpacity style={{backgroundColor:COLORS.black, alignSelf:"flex-end", padding:SIZES.padding, borderRadius:10}}>
                <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <Text style={{marginTop:10, ...FONTS.h5}}></Text>
        {categories &&  <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
    </View>
            
            <View style={{justifyContent:"center", padding:SIZES.padding*4, alignItems:"center"}}>
                <Text style={{...FONTS.h3, marginVertical:20, fontWeight:"900"}}>What are you searching for?</Text>
                <Text style={{...FONTS.h5, textAlign:"center"}}>Search for produce or services of interests in your area.</Text>
                <TouchableOpacity pointerEvents={status ? "none" : "auto"}  ref={searchButton} onPress={()=>takeFocus()} style={{backgroundColor:COLORS.black, marginVertical:40, borderRadius:40}}>
                    <Text style={{color:COLORS.white, padding:SIZES.padding*2, ...FONTS.h4, paddingHorizontal:40, fontWeight:"900"}}><Feather name="search" size={20} style={{marginHorizontal:10}} color="white" /> Start Searching</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("addProduct",)} style={{backgroundColor:COLORS.black, borderRadius:60, padding:10}}>
                    <Feather name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
    
        </View>
        </KeyboardAvoidingView>
    )
}

export default Search
