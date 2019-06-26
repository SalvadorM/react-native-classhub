import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

//functions 
import { _getFriendList, _getUserIdFriendList} from '../functions/friendship'

export default class ViewFriendListScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            friendList: [],
            error: false,
            cbResponce: false,
        }

        //get users from props.userId         
    }

    componentDidMount(){
        this._getFL()
    }
    
    _getFL = async () => {
        try{
            //check for which user data to get
            const userId = this.props.userId 
            let friendListData 
            if(this.props.currentUser){
                friendListData = await _getFriendList()
            } else {
                friendListData = await _getUserIdFriendList(userId)
            }

            console.log(friendListData)
            this.setState({friendList: friendListData, cbResponce: true})
        }
        catch(e){
            console.log(e)
            this.setState({
                error: true
            })
        }
    }

    _renderListItem = (item) => {
        let user = item.item
        console.log(user)

        return (
            <Text style={styles.itemCard}>{user.username}</Text>
        )
    }

    render(){
        const { friendList } = this.state

        return(
            <View style={styles.container}>
                <Text style={styles.headerTop}>Friends</Text>
                <FlatList 
                    data={friendList}
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
    headerTop: {
        fontSize: 24,
        marginTop: 12,
    },
    itemCard: {
        margin: 8,
        color: 'blue',
    }

})