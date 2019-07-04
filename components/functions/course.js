import axios from '../../utilities/axios'

import { checkRequestStatus } from './error'

/*
    check status callBack
*/
export const _getUserCourses = async ( season, year ) => {
    try{
        let api_url = `/usercourse/userclasses/?season=${season}&year=${year}`

        const coursesRes = await axios.get(api_url)
        const status = await checkRequestStatus(coursesRes.status)

        if(status) {
            return coursesRes.data
        }

        throw 'Error'
    }
    catch(e){
        console.log(e)
        return false
    }
}

export const getCourseInformation = async (classcode) => {
    try { 
        let api_url =  `/class/findclass/${classcode}`

        const courseRes = await axios.get(api_url)
        const status = await checkRequestStatus(courseRes.status)

        if(status){
            return courseRes.data 
        }

        throw 'Error'
    
    }catch(e) {
        console.log(e)
        return false
    }
}

export const getCourseStudents = async (classcode, season, year, section) => {
    try {
        let api_url = `/usercourse/classmates?year=${year}&season=${season}&classcode=${classcode}&section=${section}`

        const courseStudentsRes = await axios.get(api_url)
        const status = await checkRequestStatus(courseStudentsRes.status)

        if (status) {
            return courseRes.data 
        }

        throw 'Error'

    } catch(e) {
        console.log(e)
        return false
    }
}