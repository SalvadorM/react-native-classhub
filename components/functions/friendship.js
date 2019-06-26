import axios from '../../utilities/axios'

export const _getFriendList = async () => {
    try{
        const userListRes = await axios.get('/friendship/friendlist')
        console.log(userListRes)
        return userListRes.data 
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
        console.log(userListRes)
        return userListRes.data
    }
    catch(e){
        console.log(e)
        return false
    }

}