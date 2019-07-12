import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'


export default class FriendList extends Component{
    constructor(props){
        super(props)

    }


    _renderListItem = (item) => {
        let user = item.item
        return (
            <TouchableOpacity 
                style={styles.cardContainer} 
                onPress={() => this.props.navigate('Profile', user)}>
                <View>
                    <Text>IMG</Text>
                </View>
                <Text style={styles.itemCard}>{user.username}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        const friendList = this.props.friendlist
        const name = this.props.name

        if(friendList.length === 0){
            return (
            <View style={styles.container}>
                <Text style={styles.header}>{`${name} has no friends`}</Text>
            </View>
            )
        }
        return(
            <View style={styles.container}>
                <FlatList 
                    data={friendList}
                    // horizontal={true}
                    renderItem={(item) => this._renderListItem(item)}
                />
            </View>
        )
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    }, 
    cardContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        width: '100%',
    },  
    headerTop: {
        fontSize: 24,
        marginTop: 12,
    },
    itemCard: {
        margin: 8,
        color: 'blue',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
    }

})