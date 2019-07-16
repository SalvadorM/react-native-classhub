import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'

//components
import CommentsScene from '../../comments/scene/CommentsScene';

//functions
import { _getPost } from '../../functions/post'

export default class PostScene extends Component {
    constructor(props){
        super(props)

        this.state = {
            author: '',
            authorId: '',
            title: '',
            body: '',
            posted: '',
            classCode: '',
            cbResponce: false, 
            error: false,
        }
    }

    componentDidMount(){
        this._setPostInfo()
    }   

    _navigate = (path, params) => {
        console.log(path, params)
        this.props.navigation.navigate(path, params)
    }

    _setPostInfo = async () => {
        try {
            const postId = this.props.navigation.state.params.id
            const postInfo = await _getPost(postId)
            this.setState({
                author: postInfo.user.username,
                authorId: postInfo.userId,
                title: postInfo.title,
                body: postInfo.body,
                posted: postInfo.createdAt,
                classCode: postInfo.classCode
            })

        } catch(e) {
            console.log(e)
            this.setState({
                error: true
            })
        }
    }


    render(){
        const { title, body, author, } = this.state 
        const postId = this.props.navigation.state.params.id

        return(
            <View style={styles.container}>
            <View style={styles.topContainer}>
                {/* <View style={styles.imgContainer}>
                    <Image source={{uri: profileIMG}} style={styles.imgStyles} />
                </View> */}

                <View style={styles.box}>
                <Text>{author}</Text>
                <Text>{title}</Text>
                <Text>{body}</Text>
            </View>
            </View>
            
            <View style={styles.bottomContainer}>
                <CommentsScene postId={postId} navigate={(path, params) => this._navigate(path, params)}/>
            </View>
        </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomContainer: {
        flex: 1,
        top: 0,
    },
    imgContainer: {
        top: 0,
        flex: 1,
        width: '100%',
        height: 300,
        alignItems: 'center',
    },
    imgStyles: {
        width: 250, 
        height: 250,
        margin: 'auto',
    },
    box: {
        flex: 1,
        alignItems: 'center', 
        paddingTop: 24,
        height: 300,
    },
    LoadContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
})