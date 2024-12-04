import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuth, handleResponse } from "./userAction"; 
import { 
    addCommentOnBlogRequest,
    addCommentOnBlogSuccess,
    addCommentOnBlogFailure,
    addRemoveCommentLikeRequest,
    addRemoveCommentLikeSuccess,
    addRemoveCommentLikeFailure,
    addReplyOnBlogCommentActionRequest,
    addReplyOnBlogCommentActionSuccess,
    addReplyOnBlogCommentActionFailure,
    addRemoveReplyLikeActionRequest,
    addRemoveReplyLikeActionSuccess,
    addRemoveReplyLikeActionFailure,
    deleteReplyOnCommentRequest,
    deleteReplyOnCommentSuccess,
    deleteReplyOnCommentFailure,
    deleteCommentOnBlogRequest,
    deleteCommentOnBlogSuccess,
    deleteCommentOnBlogFailure,
    updateCommentOnBlogRequest,
    updateCommentOnBloguccess,
    updateCommentOnBlogFailure,
    updateReplyOnBlogCommentRequest,
    updateReplyOnBlogCommentsuccess,
    updateReplyOnBlogCommentFailure,
 } from "../Reducers/blogReducer";

// add comments on blog starts

export const addCommentOnBlog = (commentBody, commentImage, slug) => async (dispatch) => {
    try{
        dispatch(addCommentOnBlogRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/comment/onPost/${slug}`, {commentBody, commentImage, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addCommentOnBlogSuccess(data));
        } 
    }catch(error){
        dispatch(addCommentOnBlogFailure(error));
    }
}
// add comments on blog ends

// update comment on blog starts
export const updateCommentOnBlog = (commentBody, commentImage, commentId, blogId) => async (dispatch) => {
    try{
        dispatch(updateCommentOnBlogRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/comment/update/onPost`, {commentBody, commentImage, commentId, blogId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateCommentOnBloguccess(data));
        } 
    }catch(error){
        dispatch(updateCommentOnBlogFailure(error.message));
    }
}
// update comment on blog ends

// add remove comment like action starts
export const addRemoveCommentLikeAction = (blogId, commentId) => async (dispatch) => {
    try{
        dispatch(addRemoveCommentLikeRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/comment/like`, {blogId, commentId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addRemoveCommentLikeSuccess(data));
        } 
    }catch(error){
        dispatch(addRemoveCommentLikeFailure(error));
    }
}
// add remove comment like action ends

// delete comment action starts
export const deleteCommentAction = (blogId, commentId) => async (dispatch) => {
    try{
        dispatch(deleteCommentOnBlogRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        // const {data, status} = await axios.post(`${API}/blog/comment/delete/${slug}`, {commentId, token}, config);
        const {data, status} = await axios.post(`${API}/blog/comment/delete`, {blogId, commentId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteCommentOnBlogSuccess(data));
        } 
    }catch(error){
        dispatch(deleteCommentOnBlogFailure(error));
    }
}
// delete comment action ends

// add reply on blog comment action starts
export const addReplyOnBlogCommentAction = (replyBody, replyImage, blogId, commentId) => async (dispatch) => {
    try{
        dispatch(addReplyOnBlogCommentActionRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/comment/reply`, {replyBody, replyImage, blogId, commentId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addReplyOnBlogCommentActionSuccess(data));
        } 
    }catch(error){
        dispatch(addReplyOnBlogCommentActionFailure(error));
    }
}
// add reply on blog comment action ends
// update reply on blog comment action starts
export const updateReplyOnBlogCommentAction = (replyBody, replyImage, blogId, commentId, replyId) => async (dispatch) => {
    try{
        dispatch(updateReplyOnBlogCommentRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/comment/update/reply/onPost`, {replyBody, replyImage, blogId, commentId, replyId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateReplyOnBlogCommentsuccess(data));
        } 
    }catch(error){
        dispatch(updateReplyOnBlogCommentFailure(error.message));
    }
}
// update reply on blog comment action ends

// add remove reply like action starts
export const addRemoveReplyLikeAction = (blogId, commentId, replyId) => async (dispatch) => {
    try{
        dispatch(addRemoveReplyLikeActionRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/comment/reply/like`, {blogId, commentId, replyId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addRemoveReplyLikeActionSuccess(data));
        } 
    }catch(error){
        dispatch(addRemoveReplyLikeActionFailure(error));
    }
}
// add remove reply like action ends

// deleteReplyOnCommentAction section starts
export const deleteReplyOnCommentAction = (blogId, commentId, replyId) => async (dispatch) => {
    try{
        dispatch(deleteReplyOnCommentRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/blog/comment/reply/delete`, {blogId, commentId, replyId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteReplyOnCommentSuccess(data));
        } 
    }catch(error){
        dispatch(deleteReplyOnCommentFailure(error));
    }
}
// deleteReplyOnCommentAction section ends