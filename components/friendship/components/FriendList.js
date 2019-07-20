import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'

const NoFriends = () => {
    return(
        <Text style={styles.empty}>No Frieds</Text>
    )
}

export default class FriendList extends Component{
    constructor(props){
        super(props)

    }

    
    _renderListItem = (item) => {
        let user = item.item
        const profileIMG = 'https://image.flaticon.com/icons/png/512/108/108637.png'
                   return (

                <TouchableOpacity 
                style={styles.cardContainer} 
                onPress={() => this.props.navigate('Profile', user)}>
                
                    <View>
                        <Image source={{uri: profileIMG}} style={styles.imageStyle} />
                    </View>

                    <View style={styles.itemCon}>
                        <Text style={styles.itemCard}>{user.username}</Text>
                    </View>

                </TouchableOpacity>
            )

    }

    render(){
        const friendList = this.props.friendlist
        const name = this.props.name
        const courseScene = this.props.courseScene

        return (
        <View style={styles.container}>
            <FlatList 
                data={friendList}
                renderItem={(item) => this._renderListItem(item)}
                ListEmptyComponent={() => <NoFriends />}
            />
        </View>
        )
        
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent:'center',
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
        height: 'auto',
    },  
    headerTop: {
        fontSize: 24,
        marginTop: 12,
    },
    itemCon: {
        padding: 2,
        width: '80%',
        justifyContent:'center',
        alignItems: 'center',
    },
    itemCard: {
        fontWeight: 'bold',
        fontSize: 32,
        color: 'white',
        borderColor: 'black', 
        borderBottomWidth: 1,
    },
    imageStyle: {
        height: 32, 
        width: 32,
    },
    empty: {
        width: '100%',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }

})