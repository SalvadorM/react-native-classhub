import axios from '../../utilities/axios'
import { AsyncStorage } from 'react-native'
 

import { checkRequestStatus } from './error'
/*
    Take care of the res.state === 200
    if not take care of error somewhere else    
*/


/*
    Sign Out User 
*/

export const _singOut = async () => {
    try{
        await AsyncStorage.removeItem('isAuthenticated')
        await AsyncStorage.removeItem('username')
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('email')

        // await AsyncStorage.removeItem('season')
        // await AsyncStorage.removeItem('year')


        //make call to api 
        const logOutRes = await axios.post('/user/logout')
        const status = await checkRequestStatus(logOutRes.status)

        if(status) {
            return logOutRes.data
        }

        throw 'Error'
    }
    catch(e){
        //handle error 
        console.log(e)
        return false
    }
}   

export const _singIn = async (user) => {
    try{
        //semester informatio default to spring
        const season = await AsyncStorage.getItem('season')
        const year = await AsyncStorage.getItem('year')

        if (!season && !year){
            await AsyncStorage.setItem('season', 'spring' )
            await AsyncStorage.setItem('year', new Date().getFullYear())
        }

        const loginRes = await axios.post('/user/login', user)
        const status = await checkRequestStatus(loginRes.status)
        await AsyncStorage.setItem('isAuthenticated', 'true')    
        await AsyncStorage.setItem('userId', loginRes.data.id)    
        await AsyncStorage.setItem('email', loginRes.data.email) 
        await AsyncStorage.setItem('username', loginRes.data.username)    
        //store user info in asyncstorage 

        if(status){
            return true
        }

        throw 'Error'
    }
    catch(e){
        console.log(e)
        return false
    }
}   

export const _getUserInfo = async () => {
    try{  

        const userRes = await axios.get('/user/info')
        const status = await checkRequestStatus(userRes.status)

        if(status) {
            return userRes.data 
        }

        throw 'Error'
    }catch(e){
        console.log(e)
        return false
    }
}


export const _getProfileInfo = async (profileId) => {
    try {
        const url =  `/user/find/${profileId}`

        const profileRes = await axios.get(url)
        const status = await checkRequestStatus(profileRes.status)

        if(status){
            return profileRes.data
        }

        throw 'Error'

    } catch(e) {
        console.log(e)
        return false
    }
}