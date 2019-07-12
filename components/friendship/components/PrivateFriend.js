import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'


export default class PrivateFriend extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }




    render(){
        return(
            <View style={styles.container}>
                <Text >
                    PRIVATE FRIEND 
                    ADDD ME 
                    GO BACK LOL
                </Text>
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

})