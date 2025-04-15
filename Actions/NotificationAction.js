import axios from "axios";
import {API} from '../config'
// import fetch from 'isomorphic-fetch';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { 
//     createQuestionNotificationRequest,
//     createQuestionNotificationSuccess,
//     createQuestionNotificationFailure,
//  } from "../Reducer/QuestionAnswerReducer";
import { 
    createQuestionRequest,
    createLikeNotificationRequest,
    createLikeNotificationSuccess,
    createLikeNotificationFailure,
    createCommentLikeNotificationRequest,
    createCommentLikeNotificationSuccess,
    createCommentLikeNotificationFailure,
    createQuestionNotificationRequest,
    createQuestionNotificationSuccess,
    createQuestionNotificationFailure,
    createAnswerNotificationRequest,
    createAnswerNotificationSuccess,
    createAnswerNotificationFailure,
    createreplyCommentNotificationRequest,
    createreplyCommentNotificationSuccess,
    createreplyCommentNotificationFailure,
    getUserNotificationRequest,
    getUserNotificationSuccess,
    getUserNotificationFailure,
    getDeleteNotificationRequest,
    getDeleteNotificationSuccess,
    getDeleteNotificationFailure,
    notificationBarUpdateRequest,
    notificationBarUpdateSuccess,
    notificationBarUpdateFailure,
    notificationCountUpdateRequest,
    notificationCountUpdateSuccess,
    notificationCountUpdateFailure,
    removeUserNotificationRequest,
    removeUserNotificationSuccess,
    removeUserNotificationFailure,
    deleteUserNotificationPermanentlyRequest,
    deleteUserNotificationPermanentlySuccess,
    deleteUserNotificationPermanentlyFailure,
    createAnswerCommentNotificationRequest,
    createAnswerCommentNotificationSuccess,
    createAnswerCommentNotificationFailure,
    blogLikeNotificationRequest,
    blogLikeNotificationSuccess,
    blogLikeNotificationFailure,
    getUnreadNotificationRequest,
    getUnreadNotificationSuccess,
    getUnreadNotificationFailure,
    readAllUserNotificationsRequest,
    readAllUserNotificationsSuccess,
    readAllUserNotificationsFailure,
 } from "../Reducers/NotificationReducer";
// create new question notification action
export const newQuestionNotificationAction = (notifier, notification, followersChannel) => async (dispatch) => {
    try{
        dispatch(createQuestionNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/send-notification`, {
            targetType: notifier.targetType, 
            targetId: notifier.targetId, 
            sender: notifier.authId, 
            title: notification,
            followersChannel: followersChannel, 
            link: notifier.link,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createQuestionNotificationSuccess(data));
        }
    }catch(error){
        dispatch(createQuestionNotificationFailure(error.message));
    }
}
// create new question notification action
// answer notification actoin
export const answerNotificationAction = (notifier, notification, followersChannel) => async (dispatch) => {
    try{
        dispatch(createAnswerNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/send-notification`, {
            targetType: notifier.targetType, 
            targetId: notifier.targetId, 
            sender: notifier.authId, 
            title: notification,
            followersChannel: followersChannel, 
            link: notifier.link,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createAnswerNotificationSuccess(data));
        }
    }catch(error){
        dispatch(createAnswerNotificationFailure(error.message));
    }
}
// like notification action starts
export const LikeNotificationAction = (notifier, notification, followersChannel) => async (dispatch) => {
    try{
        dispatch(createLikeNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/send-notification`, {
            targetType: notifier.targetType, 
            targetId: notifier.targetId, 
            sender: notifier.authId, 
            title: notification,
            followersChannel: followersChannel, 
            link: notifier.link,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createLikeNotificationSuccess(data));
        }
    }catch(error){
        dispatch(createLikeNotificationFailure(error.message));
    }
}
// like notification action ends

// comment on notification action starts
export const commentNotificationAction = (notifier, notification, followersChannel) => async (dispatch) => {
    try{
        dispatch(createAnswerCommentNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/send-notification`, {
            targetType: notifier.targetType, 
            targetId: notifier.targetId, 
            sender: notifier.authId, 
            title: notification,
            followersChannel: followersChannel, 
            link: notifier.link,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createAnswerCommentNotificationSuccess(data));
        }
    }catch(error){
        dispatch(createAnswerCommentNotificationFailure(error.message));
    }
}
// comment on notification action ends
// reply on comment notification action
export const replyOnCommentNotificationAction = (notifier, notification, followersChannel) => async (dispatch) => {
    try{
        dispatch(createreplyCommentNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/send-notification`, {
            targetType: notifier.targetType, 
            targetId: notifier.targetId, 
            sender: notifier.authId, 
            title: notification,
            followersChannel: followersChannel, 
            link: notifier.link,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(createreplyCommentNotificationSuccess(data));
        }
    }catch(error){
        dispatch(createreplyCommentNotificationFailure(error.message));
    }
}
// reply on comment notification action
// unlike and remove notification action starts
export const unlikeNotificationAction = (notifier) => async (dispatch) => {
    try{
        dispatch({type: "unLikeNotificationRequest"});
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/delete-notification`, {
            targetType: notifier.targetType, 
            blogTargetType: notifier.blogTargetType,
            targetId: notifier.targetId, 
            sender: notifier.authId,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch({
                type: "createLikeNotificationSuccess",
                payload: data,
            });
        }
    }catch(error){
        dispatch({
            type: "unLikeNotificationFailure",
            payload: "Question has not been created due to server error",
        });
    }
}
// unlike and remove notification action ends
// notifying in the notification bar action
export const getUserNotificationAction = (skip, limit) => async (dispatch) => {
    try{
        dispatch(getUserNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        let toSkip = skip;
        const {data, status} = await axios.post(`${API}/notification/get-user-notification`, {toSkip, limit, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getUserNotificationSuccess(data));
        }
    }catch(error){
        dispatch(getUserNotificationFailure(error.message));
    }
}



// get notification at header component
export const getUnreadNotification = (skip, limit) => async (dispatch) => {
    try{
        dispatch(getUnreadNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        let toSkip = skip;
        const {data, status} = await axios.post(`${API}/notification/get-unread-notification`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getUnreadNotificationSuccess(data));
        }
    }catch(error){
        dispatch(getUnreadNotificationFailure(error.message));
    }
}
// get notification at header component

// read all user notifications
export const readAllUserNotifications = (skip, limit) => async (dispatch) => {
    try{
        dispatch(readAllUserNotificationsRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        let toSkip = skip;
        const {data, status} = await axios.post(`${API}/notification/read-all-user-notification`, {token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(readAllUserNotificationsSuccess(data));
        }
    }catch(error){
        dispatch(readAllUserNotificationsFailure(error.message));
    }
}
// read all user notifications

// get notificatons for delete
export const getDeleteNotificationAction = (skip, limit) => async (dispatch) => {
    try{
        dispatch(getDeleteNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        let toSkip = skip;
        const {data, status} = await axios.post(`${API}/notification/get-delete-notification`, {toSkip, limit, token}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(getDeleteNotificationSuccess(data));
        }
    }catch(error){
        dispatch(getDeleteNotificationFailure(error.message));
    }
}
// get notificatons for delete

// notification bar update action 
export const notificationBarUpdateAction = (notificationObj) => async (dispatch) => {
    try{
        dispatch(notificationBarUpdateRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        dispatch(notificationBarUpdateSuccess(notificationObj));
    }catch(error){
        dispatch(notificationBarUpdateFailure(error.message));
    }
}
// notification bar update action 

// remove user notification from bar action starts
export const removeUserNotificationAction = (notifyId) => async (dispatch) => {
    try{
        dispatch(removeUserNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/remove-user-from-notification`, {notifyId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(removeUserNotificationSuccess(data));
        }
    }catch(error){
        dispatch(removeUserNotificationFailure(error.message));
    }
}
// remove user notification from bar action ends

// delete auth notification permanently 
export const deleteUserNotificationPermanently = (notifyId) => async (dispatch) => {
    try{
        dispatch(deleteUserNotificationPermanentlyRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/delete-user-notification`, {notifyId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteUserNotificationPermanentlySuccess(data));
        }
    }catch(error){
        dispatch(deleteUserNotificationPermanentlyFailure(error.message));
    }
}
// delete auth notification permanently 

// new blog notification starts
export const newBlogNotificationAction = (notifier, notification, followersChannel) => async (dispatch) => {
    try{
        dispatch(newBlogNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/send-notification`, {
            targetType: notifier.targetType, 
            targetId: notifier.targetId, 
            sender: notifier.authId, 
            title: notification,
            followersChannel: followersChannel, 
            link: notifier.link,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(newBlogNotificationSuccess(data));
        }
    }catch(error){
        dispatch(newBlogNotificationFailure(error.message));
    }
}
// new blog notification ends

// blog like notification action
export const blogLikeNotificationAction = (notifier, notification, followersChannel) => async (dispatch) => {
    try{
        dispatch(blogLikeNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/notification/send-blog-notification`, {
            blogTargetType: notifier.blogTargetType, 
            targetId: notifier.targetId, 
            sender: notifier.authId, 
            title: notification,
            followersChannel: followersChannel, 
            link: notifier.link,
        }, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(blogLikeNotificationSuccess(data));
        }
    }catch(error){
        dispatch(blogLikeNotificationFailure(error.message));
    }
}
// blog like notification action
// notification counter actions
export const notificationCounterAction = (counter) => async (dispatch) => {
    try{
        dispatch(notificationCountUpdateRequest());
        const token = await AsyncStorage.getItem('@token');
        dispatch(notificationCountUpdateSuccess(counter));
    }catch(error){
        dispatch(notificationCountUpdateFailure(error.message));
    }
}
// notification counter actions

