import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native'


export default class ChangeSemester extends Component{
    constructor(props){
        super(props)

        this.state = {
            season: 'spring',
            year: new Date().getFullYear(),
            cbResponce: false, 
            error: false,
        }
    }

    _changeSemester = async () => {

    }

    _close = () => {
        this.props.close()
    }

    render(){

        const { semester, year } = this.state

        return( 
            <View style={styles.container}>

                <Picker
                selectedValue={semester}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({semester: itemValue})
                }>
                    <Picker.Item label="spring" value="spring" />
                    <Picker.Item label="fall" value="fall" />
                    <Picker.Item label="summer" value="summer" />
                    <Picker.Item label="winter" value="winter" />
                </Picker>



                <TouchableOpacity style={styles.button} onPress={this._addCourse}>
                    <Text style={styles.buttonText}>Change Semester</Text>
                </TouchableOpacity> 


                <TouchableOpacity style={styles.button} onPress={this._close}>
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