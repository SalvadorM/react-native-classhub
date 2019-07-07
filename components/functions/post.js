import axios from '../../utilities/axios'

import { checkRequestStatus } from './error'

/*
    Handle responce error
*/
export const _createPost = async (postInfo) => {
    try {   
        let url = `/post/new`

        const postRes = await axios.post(url, postInfo)
        const status = await checkRequestStatus(postRes.status)

        if(status){
            return postRes.data
        }

        throw 'Error'
    }catch(e) {
        console.log(e)
        return false
    }
}

export const _getClassPosts = async (classCode) => {
    try {
        let url = `/post/courseposts/${classCode}`

        const classPostRes = await axios.get(url)
        const status = await checkRequestStatus(classPostRes.status)

        if(status){
            return classPostRes.data
        }

        throw 'Error'
    }catch(e) {
        console.log(e)
        return false
    }
}

export const _getPost = async (postId) => {
    try {
        let url = `/post/${postId}`
        const postRes = await axios.get(url)
        const status = await checkRequestStatus(postRes.status)

        if(status){
            return postRes.data
        }

        throw 'Error'

    }catch(e) {
        console.log(e)
        return false
    }
}

export const _getUserPost = async (userId) => {
    try {     
        let url = `/post/userposts/${userId}`

        const userPostRes = await axios.get(url)
        const status = await checkRequestStatus(userPostRes.status)

        if(status){
            return userPostRes.data
        }
        throw 'Error'
    }catch(e){
        console.log(e)
        return false
    }
}

//Comments

export const _getPostComments = async (postId) => {
    try {
        let url = `/comment/postcomments/${postId}`
        const commentsRes = await axios.get(url)
        const status = await checkRequestStatus(commentsRes.status)

        if(status){
            return commentsRes.data
        }
        throw 'Error'
    }catch(e) {
        console.log(e)
        return false
    }
}

export const _createComment = async (comment) => {
    try {
        let url = `/comment/new`
        const commentRes = await axios.post(url, comment)
        const status = await checkRequestStatus(commentRes.status)

        if(status){
            return commentRes.data
        }

        throw 'Error'

    }catch(e) {
        console.log(e)
        return false
    }
}

export const _getUserComments = async (userId) => {
    try {
        let url = `/comment/usercomments/${userId}`
        const userCommentRes = await axios.get(url)
        const status = await checkRequestStatus(userCommentRes.status)
        if(status){
            return userCommentRes.data
        }

        throw 'Error'
    }   catch(e) {
        console.log(e)
        return false
    } 
}