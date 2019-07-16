import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'


export default class PostsList extends Component {
    constructor(props){
        super(props)
    }

    _renderPostItem = (item) => {

        const post = item.item
        const arrowIMG = 'https://image.flaticon.com/icons/png/512/130/130907.png'

        return(
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => this.props.navigate('Post', post)}>

                <Image source={{uri: arrowIMG}} style={styles.arrowStyle} />

                <View style={styles.titleCon}>
                    <Text style={styles.title}>{post.title}</Text>
                </View>

            </TouchableOpacity>
        )
        
    }

    render() {
        const posts = this.props.posts
        const name = this.props.name



        // if(posts.length === 0){
        //     return (
        //     <View style={styles.container}>
        //         <Text style={styles.header}>{`${name} has no posts`}</Text>
        //     </View>
        //     )
        // }

        return (
            <View style={styles.container}>
                <FlatList 
                    horizontal={true}
                    data={posts}
                    ItemSeparatorComponent={() => <View style={{width: 5}} />}
                    renderItem={(item) => this._renderPostItem(item)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    cardContainer: {
        height: 200,
        width: 135,
        backgroundColor: 'grey',
        alignItems: 'center',
        borderRadius: 4,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
    }, 
    arrowStyle: {
        width: 25,
        height: 25,
    },
    titleCon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    }
})