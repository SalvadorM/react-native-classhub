import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

export default class CoursesList extends Component{
    _renderCourseItem = (item) => {
        const course = item.item
        return(
            <View style={styles.cardContainer}>
                <View><Text>X</Text></View>
                <View><Text>{course.className}</Text></View>
            </View>
        )
    }

    render(){
        const classes = this.props.classes
        return(
            <View style={styles.container}>
                <FlatList 
                    data={classes}
                    renderItem={(item) => this._renderCourseItem(item)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        padding: 8,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 4,
        width: '100%',
    }
})