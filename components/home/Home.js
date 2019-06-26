import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'


import { _singOut, _getUserList } from '../functions/user_functions'


//import screen navigation components 

import CourseScreen from '../course/Courses'
import SearchScreen from '../search/Search'
import ViewFriendListScreen from '../friendship/ViewFriendList'


class HomeScreen extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            userId: '',
            cbResponce: false,
        }

        this._setInfo()
    }

    _setInfo = async () => {
        //get info from asyncstorage 
        //and update state 
        try{
            const username = await AsyncStorage.getItem('username')
            const currUser = await AsyncStorage.getItem('userId')
            this.setState({
                username: username, userId: currUser, cbResponce: true
            })
        }
        catch(e){
            console.log(e)
            this.setState({
                error: true,
            })
        }
    }

    _signOutUser = async () => {
        try{
            console.log('singing out user')

            if( _singOut() ){
                console.log('user has been log out')
                this.props.navigation.navigate('AuthLoading')
            } else {
                console.log('there was an error in _logout ')
            }
            console.log('user has been log out')
        }
        catch(e) {
            console.log(e)
        }
    }


    _checkAuth = async () => {
        await _getUserList()
    }

    render(){
        const { username, userId, cbResponce } = this.state
        const userInfo = cbResponce ? <ViewFriendListScreen userId={userId} currentUser={true}/> : <View/> 

        return(
            <View style={[styles.container, styles.main]}>
                <Text style={styles.header}>{`Welcome ${username}!`}</Text>
                <TouchableOpacity style={styles.button} onPress={this._signOutUser}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.button} onPress={this._checkAuth}>
                    <Text style={styles.buttonText}>USER INFO</Text>
                </TouchableOpacity> 

                {userInfo}

            </View>
        )
    }
}

const BottomTabNav = createBottomTabNavigator({
    Home: HomeScreen, 
    Courses: CourseScreen,
    Search: SearchScreen,
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    main: {
        marginTop: 28,
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

export default createAppContainer(BottomTabNav)