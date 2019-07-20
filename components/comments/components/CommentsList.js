import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

const NoComments = () => {
    return(
        <Text style={styles.empty}>No Comments</Text>
    )
}

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
                onPress={() => this.props.navigate('Post', post)}>

                <TouchableOpacity style={styles.userBtn} onPress={()=> this.props.navigate('Profile', {userId: comment.userId})}>
                    <Text style={styles.username}>{comment.user.username}</Text>
                </TouchableOpacity>

                <View style={styles.bodyCon}>
                    <Text style={styles.title}>{comment.body}</Text>
                </View>

            </TouchableOpacity>
        )
    }

    render() {
        const comments = this.props.comments 
        const name = this.props.name


        return (
            <View style={styles.container}>
                <FlatList 
                    data={comments}
                    renderItem={(item) => this._renderCommentItem(item)}
                    ListEmptyComponent={() => <NoComments />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3d9a96',
        margin: 4,
        marginTop: 12,
        padding: 4,
    },
    cardContainer: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '100%',
        height: 'auto',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
    }, 
    bodyCon: {
        padding: 2,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    }, 
    username: {
        fontSize: 8,
        color: 'white'
    },
    userBtn: {
        padding: 2,
        backgroundColor: '#192d3e'
    }, 
    empty: {
        width: '100%',
        fontSize: 24,
        fontWeight: 'bold', 
        color: 'white'

    }
})