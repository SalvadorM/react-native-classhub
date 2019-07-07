import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'
import Loading from '../../extras/loading'


export default class CourseScene extends Component {
    constructor(props){
        super(props)

        this.state = { 
            cbResponce: false, 

        }
    }

    componentDidMount(){
        console.log(this.props)
        const { classCode } = this.props.navigation.state.params.params


    }

    render(){
        const { cbResponce } = this.state 


        if(!cbResponce) {
            return( <Loading /> )
        }
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