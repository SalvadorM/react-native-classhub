import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'


export default class AddCourse extends Component{
    constructor(props){
        super(props)

        this.state = {
            classCode: '',
            className: '',
            information: '',
            section: '',
            cbResponce: false, 
            error: false,
        }
    }

    _addCourse = async () => {

    }

    _cancel = () => {
        console.log('cancel, exit')
    }

    _close = () => {
        this.props.close()
    }

    render(){
        console.log(this.props)
        const { classCode, className, information, section } = this.state

        return( 
            <View style={styles.container}>
                <TextInput style={styles.inputBox} 
                    placeholder="classCode"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(classCode) => this.setState({ classCode })}
                    value={classCode}
                />

                <TextInput style={styles.inputBox} 
                    placeholder="className"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(className) => this.setState({ className })}
                    value={className}
                />  
                <TextInput style={styles.inputBox} 
                    placeholder="information"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(information) => this.setState({ information })}
                    value={information}
                />  
                <TextInput style={styles.inputBox} 
                    placeholder="section"
                    placeholderTextColor = "#ECEFF1"
                    onChangeText={(section) => this.setState({ section })}
                    value={section}
                />  

                <TouchableOpacity style={styles.button} onPress={this._addCourse}>
                    <Text style={styles.buttonText}>Add Course</Text>
                </TouchableOpacity> 


                <TouchableOpacity style={[styles.button, styles.cancel]} onPress={this._close}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity> 


            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 150,
        color:'#2D3142',
        backgroundColor: '#EF8354',
        borderRadius: 25,
        marginTop: 25,
        paddingVertical: 10
      },
      cancel : {
        backgroundColor: '#e23b4b'
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
      },
      inputBox: {
        width:300,
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'white',
        marginVertical: 15,
        borderRadius: 20,
        backgroundColor: '#25689e',
        marginTop: 25,
        paddingVertical: 13,
        textAlign: 'center',
      },
})