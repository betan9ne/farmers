import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, TextInput, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import useGetFarmers from '../crud/useGetFamers'
import {useNavigation} from '@react-navigation/native'

function Explore() {

    let farmers = useGetFarmers().docs
    console.log(farmers)
    const navigation = useNavigation()

    const renderFarmers = ({ item }) => (           
        <TouchableOpacity onPress={()=>navigation.navigate("userProfile", {item})} style={{paddingVertical:10,marginHorizontal:5,paddingHorizontal:20, borderColor:COLORS.lightGray, borderRadius:20, backgroundColor:COLORS.white, borderWidth:0.4}}>
            <Text style={{paddingHorizontal:20, color:COLORS.dark, ...FONTS.h5}}>{item.name}</Text>
            <Text style={{paddingHorizontal:20, color:COLORS.dark, ...FONTS.h6}}>{item.type}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{padding:SIZES.padding*2, height:"100%", backgroundColor:COLORS.white}}>
            <Text style={{...FONTS.h2}}>Explore</Text>

            <View style={{marginTop:30}}>
                {
                    //radnomly display famers , top 10
                }
                <Text style={{...FONTS.h4, marginBottom:20}}>Famers Spotlight</Text>
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
            </View>

            <View style={{marginTop:30}}>
                {
                //produce with the most farmers
                }
                 <Text style={{...FONTS.h4}}>Popular Produce</Text>
            </View>
        </View>
    )
}

export default Explore
