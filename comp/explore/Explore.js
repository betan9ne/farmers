import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, TextInput, Button} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"

function Explore() {
    return (
        <View style={{padding:SIZES.padding*2}}>
            <Text style={{...FONTS.h2}}>Explore</Text>
        </View>
    )
}

export default Explore
