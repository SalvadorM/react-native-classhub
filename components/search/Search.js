import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'


export default class SearchScreen extends Component {
    constructor(props){
        super(props)
    }


    render(){

        return(
            <View style={styles.container}>
                <Text>SEARCH OPTIONS</Text>
                <Text>POST</Text>
                <Text>COMMENTS</Text>
                <Text>USERNAME</Text>
                <Text>COURSES</Text>
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