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
            <Text style={{...FONTS.h5}}>{data.produce}</Text>
            <Text style={{...FONTS.h6}}>{data.produce_category}</Text>
        </View>
    )
}

export default SearchItem
