import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'


export default class UserScene extends Component {
    constructor(props){
        super(props)
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