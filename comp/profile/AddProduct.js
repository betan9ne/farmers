import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, TextInput, Button} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"

function AddProduct() {
    const[price, setPrice]= useState(null)
    const[items, setItems]= useState(null)
    return (
        <View style={{padding:SIZES.padding*2, height:"100%", backgroundColor:COLORS.white}}>
            <Text style={{...FONTS.h5}}>Add a product to your catalogue for buyers to see what you have in stock.</Text>

            <View style={{marginTop:30}}>
                <Text  style={{...FONTS.h5, marginTop:10}}>Select Item</Text>
                <Text style={{...FONTS.h5, marginTop:10}}>Add Gallery</Text>
                <Text style={{...FONTS.h5, marginTop:10}}>Price</Text>
                <TextInput placeholder="How much does it cost" onChangeText={(value)=>setPrice(value)} style={{padding: SIZES.padding*2,}} />
                <Text style={{...FONTS.h5, marginTop:10}}>Items Available</Text>
                <TextInput placeholder="What do you have available" onChangeText={(value)=>setItems(value)} style={{padding: SIZES.padding*2,}} />
                <Text>Delivery or Pick Up</Text>

            </View>
        </View>
    )
}

export default AddProduct
