import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

//functions
import { _singIn } from '../functions/user_functions'

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
        console.log(this.state)

        let { username, password } = this.state

        if ( true ){

            let user = { username, password }
            console.log('hreer')

            if(_singIn(user)){
                console.log('navigating to app screen')
                this.props.navigation.navigate('App')
            }else {
                console.log('there was an error in _signIn')
                this.setState({
                    error: true, 
                    errorMessage: 'Please enter information'
                })
            }
        }   
        else {
            this.setState({
                error: true, 
                errorMessage: 'Please enter information'
            })
        }

    }


    render(){

        let { username, password, error, errorMessage } = this.state

        let errorMessageView = ''
        if(error){
            errorMessageView = errorMessage
        }   

        return(
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <Text styles={styles.header}>{errorMessageView}</Text>
                </View>

                <TextInput style={styles.inputBox} 
                    placeholder="username"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(username) => this.setState({ username })}
                    value={username}
                    />

                <TextInput style={styles.inputBox} 
                    placeholder="password"
                    placeholderTextColor = "#ECEFF1"
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
        backgroundColor: '#4F5D75',
    },
    inputBox: {
        width:300,
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'white',
        marginVertical: 15
      },
      button: {
        width:200,
        color:'#2D3142',
        backgroundColor: '#EF8354',
        borderRadius: 25,
        marginTop: 15,
        paddingVertical: 13
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
      },
      
  });