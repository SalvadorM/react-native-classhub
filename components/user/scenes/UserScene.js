import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
//components 
import ViewFriendListScreen from '../../friendship/ViewFriendList'

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
            renderPrivate: false,
            error: true
        }
    }

    componentDidMount() {
        this._setProfileInfo()
    }

    _setProfileInfo = async () => {
        try {
            const userProfileId = this.props.navigation.state.params.id 
            const friendStatus = await _isFriends(userProfileId)
            const profileInfo = await _getProfileInfo(userProfileId)

            if(friendStatus){
                this.setState({
                    name: profileInfo.name,
                    email: profileInfo.email,
                    username: profileInfo.username,
                    renderPrivate: false,
                    userId: userProfileId,
                })
            }
            this.setState({
                name: profileInfo.name,
                email: profileInfo.email,
                username: profileInfo.username,
                renderPrivate: true,
            })

        } catch(e) {
            console.log(e)
            this.setState({ error: true})
        }
    }

    _navigate = (path, params) => {
        console.log('text')
        this.props.navigation.push(path, params)
    }

    render(){
        const { name, email, username, renderPrivate, userId } = this.state 
        const profileIMG = 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'

        const BttmContainer = (renderPrivate) ? <ViewFriendListScreen userId={userId} currentUser={true} navigate={(path ,params) => this._navigate(path, params)} /> : <Text>HI</Text>
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
        flex: 2,
        flexDirection: 'row',
        height: '40%'

    },
    bottomContainer: {
        flex: 1,
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
    }
})