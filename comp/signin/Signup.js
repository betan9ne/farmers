import React, { Component } from 'react';
import { Alert, Button, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Name
// gender
// district
// province
// usertype
// phone

export default function Signup() {

  return (
    <View style={styles.container}>
        <Text style={styles.titleText2}>Farmers</Text>
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
        style={styles.buttonLogin}>
        <Text style={styles.buttonText}>Login </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: .9,
        width: '80%',
        // backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: .5,
        // borderRadius: 9,
        // borderColor: 'black',
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
    button: {
        fontSize: 6,
        //   backgroundColor: 'lightgrey',
        padding: 3,
        marginBottom: 10,
        borderWidth: .3,
        borderRadius: 5,
},
    buttonLogin: {
        fontSize: 10,
        backgroundColor: 'rgb(137, 234, 139)',
        color: 'white',
        padding: 6,
        margin: 3,
        borderRadius: 5,
}
});
