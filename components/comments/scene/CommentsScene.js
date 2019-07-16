import React, { Component } from 'react'
import { View, Text , StyleSheet, TextInput, TouchableOpacity } from 'react-native'

//components 
import CommentsList from '../components/CommentsList'


//functions
import { _getPostComments, _createComment } from '../../functions/post'

export default class CommentsScene extends Component {
    constructor(props){
        super(props)

        this.state = {
            commentInput: '',
            comments: [],
            postId: '',
            cbResponce: false, 
            error: false,
        }
    }

    componentDidMount(){
        this._setComments()
    }   

    _setComments = async () => {
        try {
            const postId = this.props.postId
            const comments = await _getPostComments(postId)

            this.setState({
                comments, cbResponce: true, postId
            })

        } catch(e) {
            console.log(e)
            this.setState({
                error: true
            })
        }
    }

    _postComment = async () => {
        try {
            const { commentInput, postId } = this.state 

            if(commentInput.length !== 0){
                const comment = {
                    commentBody: commentInput, postId
                }

                const commentRes = await _createComment(comment)

                if(commentRes){
                    this.setState({
                        commentInput: '',
                    })
                    this._setComments()
                }
            } else {
                console.log('comment is empty')
            }
        }
        catch(e) {
            console.log(e)
            this.setState({error: true})
        }
    }

    render(){

        const { commentInput, comments } = this.state

        return(
            <View style={styles.container}>

                <TextInput style={styles.inputBox} 
                                    placeholder="comment here"
                                    placeholderTextColor = "grey"
                                    onChangeText={(commentInput) => this.setState({ commentInput })}
                                    value={commentInput}
                                    />

                <TouchableOpacity style={styles.button} onPress={this._postComment}>                      
                      <Text style={styles.touchText}> Make a post </Text>
                </TouchableOpacity>

                <View style={styles.bottomCon} >
                    <CommentsList comments={comments} navigate={(path, params) => this.props.navigate(path, params)}/>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputBox: {
        width:300,
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'black',
        marginVertical: 15,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'black'
      },
      button: {
        width:200,
        color:'#2D3142',
        backgroundColor: '#EF8354',
        borderRadius: 25,
        marginTop: 25,
        paddingVertical: 13
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
      },
})