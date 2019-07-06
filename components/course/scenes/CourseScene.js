import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'


export default class CourseScene extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){

        return(
            <View style={styles.container}>
                <Text> Course class Info</Text>
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