import axios from '../../utilities/axios'
import {checkRequestStatus} from './error'

export const _getFriendList = async () => {
    try{
        const userListRes = await axios.get('/friendship/friendlist')

        const status = await checkRequestStatus(userListRes.status)

        if(status){
            return  userListRes.data 
        } 

        throw 'Error'
    }
    catch(e){
        console.log(e)
        return false
    }
}

export const _getUserIdFriendList = async (userId) => {
    try{
        let url = `/friendship/profilefriendslist/${userId}`
        const userListRes = await axios.get(url)
        
        const status = await checkRequestStatus(userListRes.status)

        if(status){
            return userListRes.data
        } 

        throw 'Error'
    }
    catch(e){
        console.log(e)
        return false
    }

}

export const _acceptFriendRequest = async (acceptedFriendId) => {
    try {
        let url = `/friendship/acceptrequest`
        let body = {
            request: acceptedFriendId
        }
    
        const afRes = await axios.post(url, body)

        const status = await checkRequestStatus(afRes.status)

        if(status){
            return afRes.data
        } 

        throw 'Error No User'
         
    }   catch(e) {
        console.log(e)
        return false
    } 
}

export const _sendFriendRequest = async (requestedFriendId) => {
    try {
        let body = {
            request: requestedFriendId
        }
        let url = `/friendship/friendrequest`
        
        const sfRes = await axios.post(url,body)
        const status = await checkRequestStatus(sfRes.status)

        if(status){
            return sfRes.data
        } 

        throw 'Error No User'

    }catch(e) {
        console.log(e)
        return false
    }
}

export const _isFriends = async (friendId) => {
    try{
        let url = `/friendship/isfriend/${friendId}`

        let responce = await axios.get(url)

        const status = await checkRequestStatus(frRes.status)

        if(status){
            let isFriends = (responce.data.friend)? true : false
            return isFriends
        } 

        throw 'Error No User'

    }
    catch(err){
        console.log(err)
        return false
    }
   
}

export const _removeFriend = async () => {

}