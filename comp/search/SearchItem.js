import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity,} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import useGetUser from '../crud/useGetUser'

const SearchItem =({data}) => {
let user = useGetUser(data.u_id).docs
    return (
        <View style={{padding:SIZES.padding*2}}>
            <Text style={{...FONTS.h4}}>{user.name}</Text>
            <View style={{flexDirection:"row"}}>
                <Text style={{...FONTS.h6, flex:1}}>{data.produce}</Text>
                <Text style={{...FONTS.h6, textAlign:"right", flex:1}}>{data.produce_category}</Text>
            </View>
        </View>
    )
}

export default SearchItem
