import React from 'react'
import {Text, View, } from 'react-native'
import { SIZES, FONTS, COLORS } from "../../constants"

function About() {
    return (
        <View style={{backgroundCOlor:COLORS.white, padding:SIZES.padding*2}}>
            <Text style={{...FONTS.h2, textAlign:"center"}}>
                Version 0.0.0.1
                {"\n\n"}
                2021
                {"\n\n"}
                          
            </Text>
    <Text style={{...FONTS.h5, textAlign:"center"}}>88radium {"\n\n"}Designed and developed by Pukuta and Chisomo</Text>
        </View>
    )
}

export default About
