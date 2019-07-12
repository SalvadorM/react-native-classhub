import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'

//functions
import { _isFriends } from '../../functions/friendship'
import { _getProfileInfo } from '../../functions/user_functions'

export default class UserProfileScene extends Component {
    constructor(props){
        super(props)

        this.state = {
            error: true
        }
    }

    componentDidMount() {

    }

    _setProfileInfo = async () => {
        try {

        } catch(e) {
            console.log(e)
            this.setState({ error: true})
        }
    }

    render(){

        return(
            <View style={styles.container}>
                <Text>User Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    }
})