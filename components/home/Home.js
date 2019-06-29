import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'


import { _singOut, _getUserInfo } from '../functions/user_functions'


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
            commentLen: '',
            postLen: '',
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
            const userInfo = await _getUserInfo()

            this.setState({
                username: username, userId: currUser, commentLen: userInfo.comment_len,postLen: userInfo.post_len,cbResponce: true
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

    render(){
        const { username, userId, cbResponce, commentLen, postLen } = this.state
        const userFriendList = cbResponce ? <ViewFriendListScreen userId={userId} currentUser={true}/> : <View/> 

        const profileIMG = 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'
        return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.imgContainer}>
                    <Image source={{uri: profileIMG}} style={styles.imgStyles} />
                </View>

                <View style={styles.box}>
                    <Text style={styles.headerText}>{`Welcome ${username}!`}</Text>
    
        
                    <View style={styles.userInfoContainer}>

                    <View style={styles.userInfoBox}>
                        <Text style={styles.boxText}>Comments: {commentLen}</Text>
                    </View>

                    <View style={styles.userInfoBox}>
                        <Text style={styles.boxText}>Posts: {postLen}</Text>
                    </View>

                </View>

                    {userFriendList}


                    <TouchableOpacity style={styles.button} onPress={this._signOutUser}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity> 

                </View> 
            </ScrollView>
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
        backgroundColor: '#3D709A',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        textAlign: 'center',

    },
    imgContainer: {
        width: '100%',
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    imgStyles: {
        width: 350, 
        height: 350,
        margin: 'auto',
    },
    userInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 12,
    },
    userInfoBox: {
        
    },
    box: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    headerText: {
        paddingTop: 16,
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        width: 200,
        backgroundColor: '#D9612E',
        borderRadius: 20,
        marginVertical: 15,
        paddingVertical: 10,
        justifyContent:'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
    }
})

export default createAppContainer(BottomTabNav)