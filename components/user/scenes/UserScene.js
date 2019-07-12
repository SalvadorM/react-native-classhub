import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, AsyncStorage } from 'react-native'
//components 
import BottomProfileScene from '../components/BottomProfileScene'
import PrivateFriend from '../../friendship/components/PrivateFriend'

//functions
import { _isFriends } from '../../functions/friendship'
import { _getProfileInfo } from '../../functions/user_functions'

export default class UserProfileScene extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            username: '',
            userId: '',
            renderPrivate: true,
            error: true
        }
    }

    componentDidMount() {
        console.log(this.props, this.state)

        this._setProfileInfo()
    }

    _setProfileInfo = async () => {
        try {
            const userProfileId = this.props.navigation.state.params.id 
            console.log(userProfileId)
            const sessionUserId = await AsyncStorage.getItem('userId')
            const friendStatus = await _isFriends(userProfileId)
            const profileInfo = await _getProfileInfo(userProfileId)

            let sameUser = (userProfileId === sessionUserId) ? true : false
            console.log(friendStatus, sameUser)

            if(friendStatus || sameUser){
                console.log('herer')
                this.setState({
                    name: profileInfo.name,
                    email: profileInfo.email,
                    username: profileInfo.username,
                    renderPrivate: false,
                    userId: userProfileId,
                })
            } else {
                this.setState({
                    name: profileInfo.name,
                    email: profileInfo.email,
                    username: profileInfo.username,
                    renderPrivate: true,
                })
            }


        } catch(e) {
            console.log(e)
            this.setState({ error: true})
        }
    }

    _navigate = (path, params) => {
        console.log(params)
        this.props.navigation.push(path, params)
    }

    render(){
        const { name, email, username, renderPrivate, userId } = this.state 
        const profileIMG = 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'
        const BttmContainer = (!renderPrivate) ? <BottomProfileScene userId={userId} name={ name } navigate={(path ,params) => this._navigate(path, params)} /> : <PrivateFriend userId={userId} />
        
        return(
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.imgContainer}>
                    <Image source={{uri: profileIMG}} style={styles.imgStyles} />
                </View>

                    <View style={styles.box}>
                    <Text>{username}</Text>
                    <Text>{name}</Text>
                    <Text>{email}</Text>
                </View>
                </View>
                
                <View style={styles.bottomContainer}>
                    {BttmContainer}
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomContainer: {
        flex: 1,
        top: 0,
    },
    imgContainer: {
        top: 0,
        flex: 1,
        width: '100%',
        height: 300,
        alignItems: 'center',
    },
    imgStyles: {
        width: 250, 
        height: 250,
        margin: 'auto',
    },
    box: {
        flex: 1,
        alignItems: 'center', 
        paddingTop: 24,
        height: 300,
    }
})