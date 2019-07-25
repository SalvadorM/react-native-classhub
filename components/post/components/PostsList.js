import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'

const NoPost = () => {
    return(
        <Text style={styles.empty}>No Post</Text>
    )
}

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
                    <Text style={styles.titleSM}>title</Text>  
                    <Text style={styles.title}>{post.title}</Text>
                </View>

            </TouchableOpacity>
        )
        
    }

    render() {
        const posts = this.props.posts

        return (
            <View style={styles.container}>
                <FlatList 
                    horizontal={true}
                    data={posts}
                    ItemSeparatorComponent={() => <View style={{width: 3}} />}
                    ListEmptyComponent={() => <NoPost />}
                    renderItem={(item) => this._renderPostItem(item)}
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
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3d9a96',
        margin: 4, 
        marginTop: 12,
        padding: 4,
    },
    cardContainer: {
        margin: 4,
        width: 135,
        backgroundColor: '#2F5575',
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
        fontSize: 14,
        color: 'white',
    },
    titleSM: {
        fontWeight: '100',
        fontSize: 8,
        color: 'white',
    },
    itemCard: {
        fontWeight: 'bold',
        fontSize: 32,
        color: 'white',
        borderColor: 'black', 
        borderBottomWidth: 1,
    },
    empty: {
        width: '100%',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'

    }

})