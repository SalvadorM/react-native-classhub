import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'


export default class Login extends Component{
    constructor() {
        super()

        this.state = {
            error: false,
            errorMessage: '',
            username: '',
            password: '',
        }
    }

    _handleLogin = async () => {
        //export function that is goig to log in user and handle authentication
        await AsyncStorage.setItem('isAuthenticated', 'abc');
        this.props.navigation.navigate('App');
    }
    render(){

        let { username, password } = this.state

        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox} 
                    placeholder="Username"
                    onChangeText={(username) => this.setState({ username})}
                    value={username}
                    />
                <TextInput style={styles.inputBox} 
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    value={password}
                    />  
                <TouchableOpacity style={styles.button} onPress={this._handleLogin}>
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