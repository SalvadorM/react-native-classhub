import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


//functions
import { _checkFriendRequestSent, _sendFriendRequest } from '../../functions/friendship'


export default class PrivateFriend extends Component{
    constructor(props){
        super(props)
        this.state = {
            friendRequestSent: false, 
        }
    }

    componentDidMount() {
        this._setDisplay()
    }

    _setDisplay = async () => {
        try {
            const friendId = this.props.userId
            const friendshipStatus = await _checkFriendRequestSent(friendId)
            if ( friendshipStatus === -1 ) {
                this.setState({
                    friendRequestSent: false
                })
            } else if ( friendshipStatus === 0) {
                this.setState({
                    friendRequestSent: true
                })
            }
        }
        catch(e){
            console.log(e)
            this.setState({
                error: true
            })
        }
    }
    
    _sendFriendRequest = async () => {
        try{
            const friendId = this.props.userId
            const sendRequest = await _sendFriendRequest(friendId)

            if(sendRequest.status === 0) {
                this.setState({friendRequestSent: true})
            }
        }catch(e) {
           console.log(e)
           this.setState({
               error: true
           }) 
        }
    }

    _goback = () => {
        this.props.goBack()
    }


    render(){
        const { friendRequestSent } = this.state

        let topBtn 
        if (friendRequestSent) {
            topBtn = (
                    <Text style={styles.header}>Requested friend already </Text>
            )
        } else { 
            topBtn = (
                <TouchableOpacity 
                style={styles.touchBtn}
                onPress={() => this._sendFriendRequest()}>
                
                    <Text style={styles.touchText}> Add Friend </Text>
                </TouchableOpacity>
            )
        }
        return(
            <View style={styles.container}>
                    <View style={styles.infoBox}>
                        {topBtn}
                    </View>

                    <View style={styles.infoBox}>
                        <TouchableOpacity 
                            style={styles.touchBtn}
                            onPress={() => this._goback()}
                        >
                                <Text style={styles.touchText}>Go Back </Text>
                        </TouchableOpacity>
                </View>
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
    touchBtn: {
        width: '85%',
        margin: 12,
        height: 50,
        backgroundColor: '#EF8354',
        borderRadius: 4,
        justifyContent:'center',
        alignItems: 'center',
    },
    infoBox: {

    }, 
    header: {
        fontWeight: 'bold',
        fontSize: 32,
    }
})