import axios from '../../utilities/axios'
/*
    check status callBack
*/
export const _getUserCourses = async ( season, year ) => {
    try{
        let api_url = `/usercourse/userclasses/?season=${season}&year=${year}`

        let coursesRes = await axios.get(api_url)

        // console.log(coursesRes)

        return coursesRes.data

    }
    catch(e){
        console.log(e)
        return false
    }
}