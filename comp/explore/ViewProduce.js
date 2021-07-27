import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity,  Image, ScrollView, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons"
import useGetUser from '../crud/useGetUser'

const ViewProduce = ({route}) => {
    let data = route.params.item
    
    let item = useGetUser(data.u_id).docs
    const navigation = useNavigation()

    useEffect(() => {
        firebase.firestore().collection("products").doc(data.id)
        .update({
            views: firebase.firestore.FieldValue.increment(1)
        })
    }, [])
 
    const renderItem = ({ item }) => (           
        <TouchableOpacity  style={{paddingVertical:10, borderRadius:10, backgroundColor:COLORS.white}}>
       <Image  style={{flex:1, height:220, borderRadius:10, resizeMode:'cover'}}
                source={{
                    uri: item,
                }}
                />              
        </TouchableOpacity>
    )


    return (
        <ScrollView style={{backgroundColor:COLORS.white,}}>

        <View style={{backgroundColor:COLORS.white, flex:1, padding:SIZES.padding*2}}>
            <View style={{height:250}}>
            <Image  style={{width:"100%", height:"100%", borderRadius:10, resizeMode:'cover'}}
                source={{
                    uri: data.images,
                }}
                />
            </View> 

            <View style={{paddingTop:10, marginHorizontal:20, marginTop:-30, backgroundColor:COLORS.white, borderRadius:10,}}>
                <Text style={{color:COLORS.black, ...FONTS.h2,  textAlign:"center", fontWeight:"900"}}>{data.produce}</Text>
                <Text style={{color:COLORS.secondary, ...FONTS.h4, textAlign:"center", }}>{data.produce_category}</Text>
                <Text style={{color:COLORS.darkgray, ...FONTS.h6, textAlign:"center", }}>
                    {data.delivery === "0" ? "Stationary" : "Mobile"}
                    </Text>
                <View style={{flexDirection:"row", marginVertical:20}}>
                    <TouchableOpacity onPress={()=>navigation.navigate("inquire",{data})} style={{flex:1, borderRadius:10, backgroundColor:COLORS.secondary, marginHorizontal:5}}>
            <Text style={{color:COLORS.white, ...FONTS.h5, padding:SIZES.padding*2, textAlign:"center", }}>Inquiry from {item.name}</Text>
                    </TouchableOpacity>    
                </View>                
            </View>

            <View style={{flexDirection:"row", marginVertical:10}}>
                <View style={{flex:1, marginHorizontal:5,  padding:SIZES.padding*4,  borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
                     <Text style={{color:COLORS.white, ...FONTS.h6, textAlign:"center", }}>Price</Text>
                    <Text style={{color:COLORS.white, ...FONTS.h2, textAlign:"center",}}>{data.price}</Text>
                </View>
                <View style={{flex:1, marginHorizontal:5, padding:SIZES.padding*4, borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
                    <Text style={{color:COLORS.white, ...FONTS.h6, textAlign:"center", }}>Items available</Text>
                    <Text style={{color:COLORS.white, ...FONTS.h2, textAlign:"center", }}>{data.items}</Text>
                </View>
            </View>

            <Text style={{...FONTS.h4, marginVertical:20}}>Gallery</Text>
            {data &&  <FlatList
            data={data.gallery}
            veertical
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
        </View>
        </ScrollView>
    )
}

export default ViewProduce
