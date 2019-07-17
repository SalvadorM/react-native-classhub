import React, { Component } from 'react'
import { View, Text , StyleSheet, TextInput, TouchableOpacity } from 'react-native'

//components
import { _createPost } from '../../functions/post'

//functions 


export default class CreatePost extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            body: '',
            classCode: '',
        }
    }

    _submitPost = async () => {
        try { 
            const { title, body }  = this.state

            if ((title !== '') || (body !== '')) {
                const newPost = {
                    title, body, classCode: this.props.classCode
                }
                const post = await _createPost(newPost)
                if(post) {
                    this.props.close()
                }
                console.log('new post', post)
            } else {
                this.setState({
                    errorMessageView: 'title or body is empty'
                })
            }

        } catch (e) {
            console.log(e)
            this.setState({error: true})
        }
    }

    _Close = () => {
        this.props.close()
    }

    render(){

        const {title, body, errorMessageView } = this.state

        return(
            <View style={styles.container}>

            <View style={styles.headerContainer}>
                 <Text styles={styles.header}>{errorMessageView}</Text>
             </View>

            <TextInput style={styles.inputBox} 
                placeholder="title"
                placeholderTextColor = "#ECEFF1"
                onChangeText={(title) => this.setState({ title })}
                value={title}
                />

            <TextInput style={styles.inputBoxBody} 
                placeholder="body"
                placeholderTextColor = "#ECEFF1"
                onChangeText={(body) => this.setState({ body })}
                value={body}
                />  

            <TouchableOpacity style={styles.button} onPress={this._submitPost}>
                <Text style={styles.buttonText}>Post it</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.button} onPress={this._Close}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity> 
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
    inputBox: {
        width: 250,
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'white',
        marginVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#EFD154',
        textAlign: 'center',
      },
      inputBoxBody: {
        width: 250,
        height: 64,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#EFD154',
        paddingHorizontal:16,
        fontSize: 24,
        color:'white',
        marginVertical: 15,
        textAlign: 'center',
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