import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'


export default class CommentsList extends Component {
    constructor(props){
        super(props)
    }

    _renderCommentItem = (item) => {
        const comment = item.item
        const post = {
            id: comment.postId
        }
        console.log(comment)
        return(
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => this.props.navigate('Post', post)}>

                <View><Text>X</Text></View>
                <View><Text>{comment.body}</Text></View>
            </TouchableOpacity>
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