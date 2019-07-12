import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'


export default class PostsList extends Component {
    constructor(props){
        super(props)
    }

    _renderPostItem = (item) => {
        const post = item.item
        return(
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => this.props.navigate('Post', post)}>
                <View><Text>X</Text></View>
                <View><Text>{post.title}</Text></View>
            </TouchableOpacity>
        )
    }

    render() {
        const posts = this.props.posts
        const name = this.props.name

        if(posts.length === 0){
            return (
            <View style={styles.container}>
                <Text style={styles.header}>{`${name} has no posts`}</Text>
            </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList 
                    data={posts}
                    renderItem={(item) => this._renderPostItem(item)}
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