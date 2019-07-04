import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'


export default class CommentsList extends Component {
    constructor(props){
        super(props)
    }

    _renderCommentItem = (item) => {
        const comment = item.item
        return(
            <View style={styles.cardContainer}>
                <View><Text>X</Text></View>
                <View><Text>{comment.body}</Text></View>
            </View>
        )
    }

    render() {
        const comments = this.props.comments 

        return (
            <View style={styles.container}>
                <FlatList 
                    data={comments}
                    renderItem={(item) => this._renderCommentItem(item)}
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