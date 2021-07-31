import React from 'react'
import {Text, View, } from 'react-native'
import { SIZES, FONTS, COLORS } from "../../constants"
import useGetUser from '../crud/useGetUser'

const SearchItem =({data}) => {
let user = useGetUser(data.u_id).docs
    return (
        <View style={{padding:SIZES.padding*2}}>
            <Text style={{...FONTS.h4}}>{user && user.name}</Text>
            <View style={{flexDirection:"row"}}>
                <Text style={{...FONTS.h6, flex:1}}>{data.produce}</Text>
                <Text style={{...FONTS.h6, textAlign:"right", flex:1}}>{data.produce_category}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
            <Text style={{...FONTS.h6, flex:1}}>ZMW {data.price}</Text>
            <Text style={{...FONTS.h6, textAlign:"right", flex:1}}>{user && user.district}</Text>
            </View>
                
            <View style={{borderColor:COLORS.lightGray, marginTop:10, borderWidth:1}}></View>
        </View>
    )
}

export default SearchItem
