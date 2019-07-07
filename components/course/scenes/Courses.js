import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Modal } from 'react-native'

//other components 
import CoursesList from '../components/CoursesList'
import AddCourse from '../components/AddCourse'
import ChangeSemester from '../components/ChangeSemester'
import CommentsList from '../../comments/CommentsList'
import PostsList from '../../post/components/PostsList'


//functions
import { _getUserCourses } from '../../functions/course'
import { _getUserPost, _getUserComments } from '../../functions/post'


export default class CourseScreen extends Component {
    constructor(props){
        super(props)

        this.state = {  
            Courses: [],
            Comments: [],
            Posts: [],
            showCourseModal: true,
            year: new Date().getFullYear(),
            season: "spring",
            cbResponce: false,
            error: false,
            modalVisible: false,

        }
    }

    componentDidMount(){
        let { season, year } = this.state
        this._setUserInfo(season, year)
    }

    _setUserInfo = async (season, year) => {
        try {
            const UserId = await AsyncStorage.getItem('userId')
            const Courses = await _getUserCourses(season, year)
            const Posts = await _getUserPost(UserId)
            const Comments = await _getUserComments(UserId)

            this .setState({
                Courses, Posts, Comments
            })

        }catch(e){
            console.log(e)
            this.setState({ error: true})
        }
    }

    _navigate = (path, params) => {
        this.props.navigation.navigate(path, params)
    }
    setModalVisible = (bool) => {
        this.setState((prev) => ({ modalVisible: !prev.modalVisible, showCourseModal: bool}))
    }

    render(){

        const { Courses, modalVisible, showCourseModal, Comments, Posts } = this.state
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

                <CoursesList classes={Courses} navigate={(path, item) => this._navigate(path, item)}/>
                <CommentsList comments={Comments} navigate={(path, item) => this._navigate(path, item)}/>
                <PostsList posts={Posts} navigate={(path, item) => this._navigate(path, item)}/>
  
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
                                setInfo={(season, year) => this._setUserInfo(season, year)}
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
        paddingTop: 24,
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