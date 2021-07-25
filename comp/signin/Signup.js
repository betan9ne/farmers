import React, { Component } from 'react';
import { Alert, SafeAreaView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';

// Name
// gender
// district
// province
// usertype
// phone

export default function Signup() {

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Sign-up to create an account</Text>
        
        <View style={styles.miniContainer}>
        <Text style={styles.label}>*Full Name</Text>
        <TextInput
            keyboardType="default"
            placeholder="*Idah Chama"
            placeholderTextColor='rgb(135, 135, 135)'
            style={styles.input}
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
            keyboardType="default"
            placeholder="Male / Female"
            placeholderTextColor='rgb(135, 135, 135)'
            style={styles.input}
        />
        </View>

        <View style={styles.miniContainer}>
        <Text style={styles.label}>*District</Text>
        <TextInput
            keyboardType="default"
            placeholder="Kabwata"
            placeholderTextColor='rgb(135, 135, 135)'
            style={styles.input}
        />

        <Text style={styles.label}>*Province</Text>
        <TextInput
            keyboardType="default"
            placeholder="Lusaka"
            placeholderTextColor='rgb(135, 135, 135)'
            style={styles.input}
        />
        </View>


        <View style={styles.miniContainer}>
        <Text style={styles.label}>*User Type</Text>
        <TextInput
            keyboardType="default"
            placeholder="Buyer / Seller"
            placeholderTextColor='rgb(135, 135, 135)'
            style={styles.input}
        />

        <Text style={styles.label}>*Phone</Text>
        <TextInput
            keyboardType="default"
            placeholder="+260 97X XXX XXX"
            placeholderTextColor='rgb(135, 135, 135)'
            style={styles.input}
        />
        </View>


        <TouchableOpacity 
        style={{backgroundColor:COLORS.black, padding:SIZES.padding*2, borderRadius:10}}>
        <Text style={{color:COLORS.white, ...FONTS.h4, textAlign:"right" }}>Login </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:40,
        height:"100%",
       padding:SIZES.padding*2
},

miniContainer: {
    flex: .9,
    width: '80%',
    // backgroundColor: '#ecf0f1',
    alignItems: 'center',
    margin: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    borderWidth: .5,
    borderRadius: 9,
    borderColor: 'rgb(163, 252, 165 )',
},

    titleText: {
        fontSize: 18,
        marginBottom: 5,
        color: 'black',
},
    titleText2: {
        marginBottom: 20,  
        fontSize: 22,
        color: 'black',
},
    label: {
        // backgroundColor: '#ecf0f1',
        margin: 10,
},
    input: {
        fontSize: 10,
        padding: 5,
        margin:3,
        // marginBottom: 5,
        width: 100,
        textAlign: 'center',
        backgroundColor: 'rgb(243, 243, 243)',
        //   borderWidth: .5,
        borderRadius: 5,
        borderColor: 'black',
},
 
});
