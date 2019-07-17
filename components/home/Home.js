import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, RefreshControl } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'


import { _singOut, _getUserInfo } from '../functions/user_functions'


//import screen navigation components 

import CourseScreen from '../course/scenes/Courses'
import ViewFriendListScreen from '../friendship/ViewFriendList'

import UserProfileScene from '../user/scenes/UserScene'
import CourseScene from '../course/scenes/CourseScene'
import PostScene from '../post/scene/PostScene'

class HomeScreen extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            userId: '',
            commentLen: '',
            postLen: '',
            cbResponce: false,
            refreshing: false,
        }

        this._setInfo()
    }

    componentDidMount() {
        console.log('here in mount')
        this._setInfo()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            console.log('calling info')
        }
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
            if( _singOut() ){
                this.props.navigation.navigate('AuthLoading')
            } 
        }
        catch(e) {
            console.log(e)
        }
    }

    _navigate = (path, params) => {
        this.props.navigation.navigate(path, params)
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._setInfo()
        this.setState({refreshing: false})
      }

    render(){
        const { username, userId, cbResponce, commentLen, postLen } = this.state
        const userFriendList = cbResponce ? <ViewFriendListScreen userId={userId} name={username} currentUser={true} navigate={(path ,params) => this._navigate(path, params)} /> : <View/> 

        const profileIMG = 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'
        return(

        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.main} horizontal={false}       refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D709A',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        height: '100%',
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

const HomeStack = createStackNavigator({
    Home: {screen: HomeScreen},
    Profile: {screen: UserProfileScene},
    Course: {screen: CourseScene},
    Post: {screen: PostScene},
})

const CourseStack = createStackNavigator({
    Courses: {screen: CourseScreen},
    Profile: {screen: UserProfileScene},
    Course: {screen: CourseScene},
    Post: {screen: PostScene},
},
)
export default createAppContainer(createBottomTabNavigator({
    Home: {screen: HomeStack}, 
    Courses: {screen: CourseStack},
},
))

