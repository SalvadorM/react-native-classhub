import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'


export default class Home extends Component{
    constructor(props){
        super(props)
    }

    _signOutUser = async () => {
        try{
            await AsyncStorage.removeItem('isAuthenticated')
            console.log('user has been log out')
            this.props.navigation.navigate('AuthLoading')
        }
        catch(e) {
            console.log(e)
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>HELLO</Text>
                <TouchableOpacity style={styles.button} onPress={this._signOutUser}>
                    <Text style={styles.buttonText}>Sign Out</Text>
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
    button: {
        width:200,
        color:'blue',
        backgroundColor: 'green',
        borderRadius: 20,
        marginVertical: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
    }
})