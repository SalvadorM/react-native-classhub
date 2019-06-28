import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default class CourseScreen extends Component {
    constructor(props){
        super(props)
    }


    render(){
        

        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnTop}>
                    <Text> Add Course </Text>
                </TouchableOpacity>
                <Text> COURSES CONTAINER </Text>
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
    btnTop: {
        widht: '90%',
        height: 42,
    },  
})