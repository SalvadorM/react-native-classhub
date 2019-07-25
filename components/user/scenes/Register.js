import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

//functions
import { _registerUser } from '../../functions/user_functions'

export default class RegisterScreen extends Component{

    constructor() {
        super()

        this.state = {
            errorMessage: '',
            username: '',
            password: '',
            name: '',
            email: '',
            error: false,
        }
    }

    _register = async () => {
        try{
            const { username, email, password, name } = this.state

            const registerStatus = await  _registerUser({username: username.toLowerCase(), password: password.toLowerCase(), email: email.toLowerCase(), name: name.toLowerCase()})

            if(registerStatus){
                this.props.navigation.navigate('SignIn')

            }else {
                this.setState({error: true, errorMessage: 'Could not create account'})

            }

        } catch(e) {
            this.setState({error: true})
        }
    }

    render(){

        let { username, password, name, email, errorMessage, error } = this.state

        let errorMessageView = ''
        if(error){
            errorMessageView = errorMessage
        }   


        return(
            <View style={styles.container}>
                <Text style={styles.logo}>ClassHub</Text>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>{errorMessageView}</Text>
                </View>

                <TextInput style={styles.inputBox} 
                    placeholder="name"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(name) => this.setState({ name })}
                    value={name}
                    />

                <TextInput style={styles.inputBox} 
                    placeholder="username"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(username) => this.setState({ username })}
                    value={username}
                    />

                <TextInput style={styles.inputBox} 
                    placeholder="email"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(email) => this.setState({ email })}
                    value={email}
                    />  

                <TextInput style={styles.inputBox} 
                    placeholder="password"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(password) => this.setState({ password })}
                    value={password}
                />  

                <TouchableOpacity style={styles.button} onPress={() => this._register()}>
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
      },
      logo: {
        fontSize: 28, 
        fontWeight: 'bold',
        color: '#f8ffff',
        margin: 4,
        paddingBottom: 40,
    }, 
    headerContainer: {
        justifyContent:'center',
        alignItems: 'center',
      },
  });