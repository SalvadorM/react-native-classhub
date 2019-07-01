import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Modal } from 'react-native'

//other components 
import CoursesList from './CoursesList'
import AddCourse from './AddCourse'
import ChangeSemester from './ChangeSemester'


//functions
import { _getUserCourses } from '../functions/course'

export default class CourseScreen extends Component {
    constructor(props){
        super(props)

        this.state = {  
            classes: [],
            showCourseModal: true,
            year: new Date().getFullYear(),
            season: "spring",
            cbResponce: false,
            error: false,
            modalVisible: false,

        }
    }

    componentDidMount(){
        this._setCourseInfo()
        let { season, year } = this.state
        this._updateUserCourses(season, year)
    }

    _setCourseInfo = async () => {
        try{
            const season = await AsyncStorage.getItem('season')
            const year = await AsyncStorage.getItem('year')

            if (!season && !year){
                console.log('setting course season and year')
                await AsyncStorage.setItem('season', 'spring')
                await AsyncStorage.setItem('year', new Date().getFullYear())
            }

        }catch(e){
            this.setState({error: true})
        }
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

    setModalVisible = (bool) => {
        this.setState((prev) => ({ modalVisible: !prev.modalVisible, showCourseModal: bool}))
    }

    render(){
        const { classes, modalVisible, showCourseModal } = this.state
        return(
            <View style={styles.container}>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <TouchableOpacity 
                            style={styles.touchBtn}
                            onPress={() => this.setModalVisible(true)}
                        >
                            <Text style={styles.touchText}> Add Course </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoBox}>
                        <TouchableOpacity 
                            style={styles.touchBtn}
                            onPress={() => this.setModalVisible(false)}
                        >
                                <Text style={styles.touchText}>Semester Info </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CoursesList classes={classes}/>
                
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose = {() => { console.log("Modal has been closed.") } }
                    >

                    <View style={styles.modalContainer}>

                        {
                        (showCourseModal) ? 
                            ( <AddCourse
                                close={() => this.setModalVisible()} /> ) :
                            (<ChangeSemester
                                close={() => this.setModalVisible()}
                            />)
                        }

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