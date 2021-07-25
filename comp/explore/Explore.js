import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, TextInput, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import useGetFarmers from '../crud/useGetFamers'
import {useNavigation} from '@react-navigation/native'
import useGetCategories from '../crud/useGetCategories'

function Explore() {

    let farmers = useGetFarmers().docs
    let categories = useGetCategories().docs
    console.log(categories)
    const navigation = useNavigation()

    const renderFarmers = ({ item }) => (           
        <TouchableOpacity onPress={()=>navigation.navigate("userProfile", {item})} style={{paddingVertical:10,marginHorizontal:5,paddingHorizontal:20, borderColor:COLORS.lightGray, borderRadius:20, backgroundColor:COLORS.white, borderWidth:0.4}}>
            <Text style={{paddingHorizontal:20, color:COLORS.dark, ...FONTS.h5}}>{item.name}</Text>
            <Text style={{paddingHorizontal:20, color:COLORS.dark, ...FONTS.h6}}>{item.type}</Text>
        </TouchableOpacity>
    )

    const renderFilteredFarmers = ({ item }) => (           
        <TouchableOpacity onPress={()=>navigation.navigate("userProfile", {item})} style={{paddingVertical:10,height:120, marginVertical:20, marginHorizontal:5,paddingHorizontal:20, justifyContent:"center", alignItems:"center", borderColor:COLORS.lightGray, borderRadius:20, backgroundColor:COLORS.secondary, borderWidth:0.4}}>
            <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h4}}>{item.name}</Text>
            <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h6}}>{item.type}</Text>
        </TouchableOpacity>
    )

    const renderCategories = ({ item }) => (           
        <TouchableOpacity  style={{paddingVertical:20,marginHorizontal:5,paddingHorizontal:20,  marginVertical:20, borderColor:COLORS.lightGray, borderRadius:10, backgroundColor:COLORS.black, borderWidth:0.4}}>
            <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h4}}>{item.name}</Text>
          </TouchableOpacity>
    )

    return (
        <View style={{padding:SIZES.padding*2, height:"100%", backgroundColor:COLORS.white}}>
            <Text style={{...FONTS.h2}}>Explore</Text>

            <View style={{marginTop:30}}>
                 <Text style={{...FONTS.h4, marginBottom:20}}>Spotlight</Text>
                {farmers &&  <FlatList
            data={farmers.slice(0, 4)}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderFarmers}
                contentContainerStyle={{                    
                }}
            />  }
            </View>

            <View style={{marginTop:30}}>
                {
                    //famers with the most views
                }
                <Text style={{...FONTS.h4}}>Most Popular</Text>
                {farmers &&  <FlatList
            data={farmers}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderFilteredFarmers}
                contentContainerStyle={{                    
                }}
            />  }
            </View>

            <View style={{marginTop:30}}>
                {
                //produce with the most farmers
                }
                 <Text style={{...FONTS.h4}}>Popular Produce</Text>
                 {categories &&  <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderCategories}
                contentContainerStyle={{                    
                }}
            />  } 
            </View>
        </View>
    )
}

export default Explore
