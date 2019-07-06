import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'


export default class PostScene extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){

        return(
            <View style={styles.container}>
                <Text> Post info Info</Text>
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