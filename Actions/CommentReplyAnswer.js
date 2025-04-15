import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuth, handleResponse } from "./userAction"; 
import { 
    addCommentOnAnswerRequest,
    addCommentOnAnswerSuccess,
    addCommentOnAnswerFailure,
    addRemoveCommentLikeAnswerRequest,
    addRemoveCommentLikeAnswerSuccess,
    addRemoveCommentLikeAnswerFailure,
    updateCommentOnAnswerActionRequest,
    updateCommentOnAnswerActionuccess,
    updateCommentOnAnswerActionFailure,
    deleteCommentOnAnswerRequest,
    deleteCommentOnAnswerSuccess,
    deleteCommentOnAnswerFailure,
    addReplyOnAnswerCommentRequest,
    addReplyOnAnswerCommentSuccess,
    addReplyOnAnswerCommentFailure,
    addRemoveLikeinAnswerReplyRequest,
    addRemoveLikeinAnswerReplySuccess,
    addRemoveLikeinAnswerReplyFailure,
    updateReplyAnswerRequest,
    updateReplyAnswerSuccess,
    updateReplyAnswerFailure,
    deleteReplyOnCommentAnswerRequest,
    deleteReplyOnCommentAnswerSuccess,
    deleteReplyOnCommentAnswerFailure,
 } from "../Reducers/QuestionAnswerReducer";

export const addCommentOnAnswer = (commentBody, commentImage, answerId) => async (dispatch) => {
    try{
        dispatch(addCommentOnAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/comment/answer`, {commentBody, commentImage, answerId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addCommentOnAnswerSuccess(data));
        } 
    }catch(error){
        dispatch(addCommentOnAnswerFailure(error.message));
    }
}

// add remove comment like action starts
export const addRemoveCommentLikeAnswerAction = (answerId, commentId) => async (dispatch) => {
    try{
        dispatch(addRemoveCommentLikeAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/comment/like/answer`, {answerId, commentId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addRemoveCommentLikeAnswerSuccess(data));
        } 
    }catch(error){
        dispatch(addRemoveCommentLikeAnswerFailure(error));
    }
}
// add remove comment like action ends

// update comment on answer action
export const updateCommentOnAnswerAction = (commentBody, commentImage, commentId, answerId) => async (dispatch) => {
    try{
        dispatch(updateCommentOnAnswerActionRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/comment/update/onAnswer`, {commentBody, commentImage, commentId, answerId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateCommentOnAnswerActionuccess(data));
        } 
    }catch(error){
        dispatch(updateCommentOnAnswerActionFailure(error));
    }
}
// update comment on answer action
// delete comment answer action starts
export const deleteCommentAnswerAction = (answerId, commentId) => async (dispatch) => {
    try{
        dispatch(deleteCommentOnAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        // const {data, status} = await axios.post(`${API}/blog/comment/delete/${slug}`, {commentId, token}, config);
        const {data, status} = await axios.post(`${API}/question/comment/delete`, {answerId, commentId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteCommentOnAnswerSuccess(data));
        } 
    }catch(error){
        dispatch(deleteCommentOnAnswerFailure(error));
    }
}
// delete comment answer action starts

// add reply on comment of answer
export const addReplyOnAnswerComment = (replyBody, replyImage, answerId, commentId) => async (dispatch) => {
    try{
        dispatch(addReplyOnAnswerCommentRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/comment/reply`, {replyBody, replyImage, answerId, commentId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addReplyOnAnswerCommentSuccess(data));
        } 
    }catch(error){
        dispatch(addReplyOnAnswerCommentFailure(error));
    }
}
// add reply on comment of answer

// add remove comment reply like unlike
export const addRemoveLikeinAnswerReply = (answerId, commentId, replyId) => async (dispatch) => {
    try{
        dispatch(addRemoveLikeinAnswerReplyRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/comment/reply/like`, {answerId, commentId, replyId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(addRemoveLikeinAnswerReplySuccess(data));
        } 
    }catch(error){
        dispatch(addRemoveLikeinAnswerReplyFailure(error));
    }
}
// add remove comment reply like unlike

// update reply on answer comment
export const updateReplyAnswerAction = (replyBody, replyImage, answerId, commentId, replyId) => async (dispatch) => {
    try{
        dispatch(updateReplyAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/comment/update/reply/answer`, {replyBody, replyImage, answerId, commentId, replyId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(updateReplyAnswerSuccess(data));
        } 
    }catch(error){
        dispatch(updateReplyAnswerFailure(error));
    }
}
// update reply on answer comment

// delete reply on answer of comment
export const deleteReplyOnCommentAnswerAction = (answerId, commentId, replyId) => async (dispatch) => {
    try{
        dispatch(deleteReplyOnCommentAnswerRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/question/comment/reply/answer/delete`, {answerId, commentId, replyId, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteReplyOnCommentAnswerSuccess(data));
        } 
    }catch(error){
        dispatch(deleteReplyOnCommentAnswerFailure(error));
    }
} 
// delete reply on answer of comment