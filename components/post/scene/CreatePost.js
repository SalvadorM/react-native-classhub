import React, { Component } from 'react'
import { View, Text , StyleSheet } from 'react-native'

//components


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



    componentDidMount(){
        console.log(this.props)
    }

    _submitPost = async () => {
        
    }

    _Close = () => {
        this.props.close()
    }

    render(){

        return(
            <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text styles={styles.header}>{errorMessageView}</Text>
            </View>

            <TextInput style={styles.inputBox} 
                placeholder="username"
                placeholderTextColor = "#ECEFF1"
                onChangeText={(username) => this.setState({ username })}
                value={username}
                />

            <TextInput style={styles.inputBox} 
                placeholder="password"
                placeholderTextColor = "#ECEFF1"
                onChangeText={(password) => this.setState({ password })}
                value={password}
                />  

            <TouchableOpacity style={styles.button} onPress={this._handleLogin}>
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
        backgroundColor: '#4F5D75',
    },
    inputBox: {
        width:300,
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
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