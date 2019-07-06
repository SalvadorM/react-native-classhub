import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'


export default class RegisterScreen extends Component{
    constructor() {
        super()

        this.state = {
            error: false,
            errorMessage: '',
            username: '',
            password: '',
        }
    }

    onChange = (text) => {
        console.log(text)
    }


    render(){

        let { username, password } = this.state

        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox} 
                    placeholder="Username"
                    onChangeText={this.onChange}
                    value={username}
                    />
                <TextInput style={styles.inputBox} 
                    placeholder="Email"
                    onChangeText={this.onChange}
                    value={password}
                    />  
                <TextInput style={styles.inputBox} 
                    placeholder="password"
                    onChangeText={this.onChange}
                    value={password}
                />  
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
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