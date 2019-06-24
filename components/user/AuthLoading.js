import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from 'react-native'


export default class AuthLoading extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this._isUserAuthenticated()
    }

    _isUserAuthenticated = async () => {
        try {  
            const userAuth = await AsyncStorage.getItem('isAuthenticated')

            setTimeout( () => {
                console.log(userAuth)
                this.props.navigation.navigate(userAuth ? 'App' : 'Auth')
            }, 1000)
        }
        catch(err) {
            console.log(err)
        }
    }


    render(){

        return(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })