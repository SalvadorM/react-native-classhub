import React, { Component } from 'react'
import { View, Text , StyleSheet, AsyncStorage, Image, Modal, TouchableOpacity } from 'react-native'

//functions
import { _getCourseInformation, _getCourseStudents } from '../../functions/course'
import { _getClassPosts } from '../../functions/post'

//components
import Loading from '../../extras/loading'
import FriendList from '../../friendship/components/FriendList'
import PostsList from '../../post/components/PostsList'
import CreatePost from '../../post/scene/CreatePost'



export default class CourseScene extends Component {
    constructor(props){
        super(props)

        this.state = { 
            students: [],
            posts: [],
            section: '',
            className: '',
            information: '',
            section: '',
            classCode: '',
            cbResponce: false, 
            modalVisible: false,
        }
    }

    componentDidMount(){
        const { classCode, section } = this.props.navigation.state.params
        this._setCouseInfo(classCode, section )
    }

    _setModalVisible = () => {
        this.setState((prev) => ({ modalVisible: !prev.modalVisible}))
    }

    _setCouseInfo = async ( classCode, section ) => {
        try{
            const season = await AsyncStorage.getItem('season')
            const year = await AsyncStorage.getItem('year')

            const courseInfo = await _getCourseInformation(classCode)
            const posts = await _getClassPosts(classCode)
            const students = await _getCourseStudents(classCode, season, year, section)

            this.setState({
                posts,
                students,
                className: courseInfo[0].className,
                information: courseInfo[0].information,
                section: courseInfo[0].section,
                cbResponce: true,
                classCode,
            })
    
        } catch(e) {
            console.log(e)
            this.setState({
                error: true,
                cbResponce: false
            })
        }
    }

    _navigate = (path, params) => {
        this.props.navigation.navigate(path, params)
    }

    _updatePost = async () => {
        try {        
            const { classCode, } = this.props.navigation.state.params
            const posts = await _getClassPosts(classCode)

            this.setState({posts})

        } catch(e) {
            console.log(e)
            this.setState({ error: true})
        }

    }

    _close = () => {
        this._updatePost()
        this._setModalVisible()
    }

    render(){
        const { cbResponce, students, information, className, section, posts, modalVisible, classCode} = this.state 
        const classIMG = 'https://image.flaticon.com/icons/png/512/45/45954.png'
        const usersIMG =  'https://image.flaticon.com/icons/png/512/49/49148.png'
        const postIMG = 'https://image.flaticon.com/icons/png/512/114/114677.png'


        if(!cbResponce) {
            return( <Loading /> )
        }
        return(
            <View style={styles.container}>

                <View style={styles.topContainer}>
                    <View style={styles.box}>
                        <View style={styles.headerCon}>
                            <Image source={{uri: classIMG}} style={styles.imgStyles} />
                            <Text>{className}</Text>
                        </View>
                        <Text>{information}</Text>
                        <Text>{section}</Text>
                    </View>
                </View>

                <Image source={{uri: usersIMG}} style={styles.imgUserStyles} />


                <FriendList
                    courseScene={true}
                    navigate={(path, item) => this.props.navigation.navigate(path, item)}
                    friendlist={students}/>
                
                <Image source={{uri: postIMG}} style={styles.imgUserStyles} />

                <PostsList posts={posts} navigate={(path, item) => this._navigate(path, item)}/>

                <TouchableOpacity 
                            style={styles.touchBtn}
                            onPress={() => this._setModalVisible()}
                        >
                            <Text style={styles.touchText}> Make a post </Text>
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose = {() => { console.log("Modal has been closed.") } }
                    >

                    <View style={styles.modalContainer}>
                        <CreatePost classCode={classCode} close={() => this._close()} update={() => this._updatePost()}/>
                    </View>
                </Modal>
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
    topContainer: {
        flex: 1,
    },  
    headerCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },  
    imgContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    imgStyles: {
        width: 24, 
        height: 24,
        margin: 'auto',
    },
    imgUserStyles: {
        width: 64, 
        height: 64,
    },
    box: {
        flex: 1,
        alignItems: 'center', 
        justifyContent:'center',
        color: 'black'
    },
    touchBtn: {
        width: '85%',
        height: 50,
        backgroundColor: '#EF8354',
        borderRadius: 4,
        justifyContent:'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#3D709A',
    }
})