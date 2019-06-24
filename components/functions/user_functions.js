import axios from '../../utilities/axios'
import { AsyncStorage } from 'react-native'
 
/*
    Sign Out User 
*/

export const _singOut = async () => {
    try{
        await AsyncStorage.removeItem('isAuthenticated')
        //make call to api 
        const logOutRes = await axios.post('/user/logout')
        console.log(logOutRes)
        return true
    }
    catch(e){
        //handle error 
        console.log(e)
    }
}   

export const _singIn = async (user) => {
    try{
        await AsyncStorage.setItem('isAuthenticated', 'abc')    
        const loginRes = await axios.post('/user/login', user)
        console.log(loginRes)
        return true
    }
    catch(e){
        console.log(e)
        return false
    }
}   