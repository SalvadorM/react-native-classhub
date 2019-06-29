import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Modal } from 'react-native'

//other components 
import CoursesList from './CoursesList'
import AddCourse from './AddCourse'


//functions
import { _getUserCourses } from '../functions/course'

export default class CourseScreen extends Component {
    constructor(props){
        super(props)

        this.state = {  
            classes: [],
            year: new Date().getFullYear(),
            season: "spring",
            cbResponce: false,
            error: false,
            modalVisible: false,

        }
    }

    componentDidMount(){
        let { season, year } = this.state
        this._updateUserCourses(season, year)
    }

    _updateUserCourses = async (season, year) => {
        try{
            const courses = await _getUserCourses(season, year)
            console.log(courses)
            this.setState({
                classes: courses
            })
        }catch(e){
            console.log(e)
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){
        const { classes } = this.state
        return(
            <View style={styles.container}>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <TouchableOpacity style={styles.touchBtn}>
                            <Text style={styles.touchText}> Add Course </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoBox}>
                        <TouchableOpacity style={styles.touchBtn}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={styles.touchText}>Semester Info </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CoursesList classes={classes}/>
                
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose = {() => { console.log("Modal has been closed.") } }
                    >

                    <View style={styles.modalContainer}>
                        <Text>Hello World!</Text>

                        <AddCourse />
                        
                        <TouchableHighlight
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>

                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#3D709A'
    },
    infoContainer: {
        paddingTop: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'

    },  
    infoBox: {
        width: '50%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    touchBtn: {
        width: '85%',
        height: 50,
        backgroundColor: '#EF8354',
        borderRadius: 4,
        justifyContent:'center',
        alignItems: 'center',
    },
    touchText: {

    },
    modalContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#3D709A',
    }
})