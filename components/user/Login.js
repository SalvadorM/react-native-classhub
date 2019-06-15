import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'


export default class Login extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox} 
                    placeholder="Email"
                    placeholderTextColor = "black"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    />
                <TextInput style={styles.inputBox} 
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor = "black"
                    />  
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity> 
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',

    },
    inputBox: {
        width:300,
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'blue',
        marginVertical: 10
      },
      button: {
        width:200,
        color:'blue',
        backgroundColor: 'green',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'black',
        textAlign:'center'
      }
  });