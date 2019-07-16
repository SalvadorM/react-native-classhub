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
        return(
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => this.props.navigate('Profile', post)}>

                <View><Text>X</Text></View>
                <View><Text>{comment.body}</Text></View>
            </TouchableOpacity>
        )
    }

    render() {
        const comments = this.props.comments 
        const name = this.props.name

        if(comments.length === 0){
            return (
            <View style={styles.container}>
                <Text style={styles.header}>{`${name} has no commented`}</Text>
            </View>
            )
        }

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
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
    }
})