import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'

//components 
import  PostsList  from '../../post/components/PostsList'
import  CommentsList  from '../../comments/CommentsList'
import FriendList from '../../friendship/components/FriendList'

//functions
import { _getUserIdFriendList } from '../../functions/friendship'
import { _getUserCourses } from '../../functions/course'
import { _getUserPost, _getUserComments } from '../../functions/post'



export default class BottomProfileScene extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            posts: [],
            comments: [],
            friends: [],
            cbResponce: false,
            error: true
        }
    }

    componentDidMount() {
        this._setInfo()
    }

    _setInfo = async () => {
        try {
          const profileId = this.props.userId 
          const name = this.props.name
          const comments = await _getUserComments(profileId)
          const friends = await _getUserIdFriendList(profileId)
          const posts = await _getUserPost(profileId)

          this.setState({
              comments, friends, posts, cbResponce: true, name
          })

        } catch(e) {
            console.log(e)
            this.setState({ error: true})
        }
    }

    _navigate = (path, params) => {
        this.props.navigate(path, params)
    }

    render(){
        const { posts, comments, friends, cbResponce, name } = this.state 
        if(!cbResponce) {
            return (            
            <View style={[styles.loadContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>)
        }

        return(
            <View style={styles.container}>
                <FriendList name={name} friendlist={friends} navigate={(path, item) => this._navigate(path, item)}/>
                <PostsList name={name} posts={posts} navigate={(path, item) => this._navigate(path, item)}/>
                <CommentsList name={name} comments={comments} navigate={(path, item) => this._navigate(path, item)}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#4F5D75'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },

})