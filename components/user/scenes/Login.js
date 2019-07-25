import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native'

//functions
import { _singIn } from '../../functions/user_functions'

export default class LoginScreen extends Component{
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
        //export function that is goig to log in user and handle authenticatio

        //check if not empty
        if ( true ){
            
            let { username, password } = this.state
            let user = { username: username.toLowerCase(), password: password.toLowerCase() }
            const loginSuccess = await _singIn(user)

            if(loginSuccess){
                this.props.navigation.navigate('Home')
            }else {
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

    _createAccount = () => {
        this.props.navigation.navigate('Register')
    }

    _openLink = () => {
        Linking.openURL('https://classhub-hunter.herokuapp.com')
    }

    render(){

        let { username, password, error, errorMessage } = this.state

        let errorMessageView = ''
        if(error){
            errorMessageView = errorMessage
        }   

        return(
            <View style={styles.container}>
             <Text style={styles.logo} onPress={() => this._openLink()}>ClassHub</Text>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>{errorMessageView}</Text>
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

                <Text style={styles.register} onPress={() => this._createAccount()}>Create an account</Text>


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
        marginVertical: 15,
        textAlign: 'center',
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#D9612E'
      },
      button: {
        width:200,
        color:'#2D3142',
        backgroundColor: '#EF8354',
        borderRadius: 25,
        marginTop: 25,
        paddingVertical: 13
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
      },
      headerContainer: {
        justifyContent:'center',
        alignItems: 'center',
      },
      header: {

      },
      register: {
        paddingTop: 10,
        fontSize: 12, 
        color: '#f8ffff',
        margin: 4,
      },
      logo: {
          fontSize: 28, 
          fontWeight: 'bold',
          color: '#f8ffff',
          margin: 4,
          paddingBottom: 40,
      }
      
  });