import axios from '../../utilities/axios'
import { AsyncStorage } from 'react-native'
 
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


        //make call to api 
        const logOutRes = await axios.post('/user/logout')
        return true
    }
    catch(e){
        //handle error 
        console.log(e)
    }
}   

export const _singIn = async (user) => {
    try{
        const loginRes = await axios.post('/user/login', user)
        await AsyncStorage.setItem('isAuthenticated', 'true')    
        await AsyncStorage.setItem('userId', loginRes.data.id)    
        await AsyncStorage.setItem('email', loginRes.data.email) 
        await AsyncStorage.setItem('username', loginRes.data.username)    
        //store user info in asyncstorage 
        return true
    }
    catch(e){
        console.log(e)
        return false
    }
}   

export const _getUserInfo = async () => {
    try{   
        const userRes = await axios.get('/user/info')
        return userRes.data 

    }catch(e){
        console.log(e)
        return false
    }
}