import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

const NoClasses = () => {
    return(
        <Text style={styles.empty}>No Classes</Text>
    )
}

export default class CoursesList extends Component{
    constructor(props){
        super(props)
    }
    
    _renderCourseItem = (item) => {
        const course = item.item
        return(
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => this.props.navigate('Course', course)}
                >
                <View><Text style={styles.className}>{course.className}</Text></View>
            </TouchableOpacity>
        )
    }

    render(){
        const classes = this.props.classes
        return(
            <View style={styles.container}>
                <FlatList 
                    data={classes}
                    renderItem={(item) => this._renderCourseItem(item)}
                    ListEmptyComponent={() => <NoClasses />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12,
    },
    cardContainer: {
        padding: 8,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#D9612E',
        width: '100%',
    },
    empty: {
        width: '100%',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'

    },
    className: {
        fontSize: 20, 
        color: 'white',
        fontWeight: 'bold',
    }

})