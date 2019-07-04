import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'


export default class PostsList extends Component {
    constructor(props){
        super(props)
    }

    _renderPostItem = (item) => {
        const post = item.item
        return(
            <View style={styles.cardContainer}>
                <View><Text>X</Text></View>
                <View><Text>{post.title}</Text></View>
            </View>
        )
    }

    render() {
        const posts = this.props.posts

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
    }
})