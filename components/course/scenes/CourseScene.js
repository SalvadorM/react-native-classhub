import React, { Component } from 'react'
import { View, Text , StyleSheet, AsyncStorage } from 'react-native'

//functions
import { _getCourseInformation, _getCourseStudents } from '../../functions/course'
import { _getClassPosts } from '../../functions/post'

//components
import Loading from '../../extras/loading'
import FriendList from '../../friendship/components/FriendList'



export default class CourseScene extends Component {
    constructor(props){
        super(props)

        this.state = { 
            students: [],
            section: '',
            className: '',
            information: '',
            section: '',
            cbResponce: false, 
        }
    }

    componentDidMount(){
        const { classCode, section } = this.props.navigation.state.params
        this._setCouseInfo(classCode, section )
    }
    _navigate = (path, params) => {
        this.props.navigation.navigate(path, {params})
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
                className: courseInfo.className,
                information: courseInfo.information,
                cbResponce: true,
            })
            console.log(courseInfo, students, posts)
    
        } catch(e) {
            console.log(e)
            this.setState({
                error: true 
            })
        }
    }

    render(){
        const { cbResponce, students} = this.state 


        if(!cbResponce) {
            return( <Loading /> )
        }
        return(
            <View style={styles.container}>
                <Text> Course class Info</Text> 
                <FriendList 
                    navigate={(path, item) => this._navigate(path, item)}
                    friendlist={students}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    }
})