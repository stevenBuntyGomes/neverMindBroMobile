import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuth, handleResponse } from "./userAction"; 
import {
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageSocketFalse,
    sendMessageFailure,
    fetchMessageRequest,
    fetchMessageSuccess,
    fetchMessageFailure,
    receivedMessageRequest,
    receivedMessageSuccess,
    receivedMessageFailure,
    sendMessageNotificationRequest,
    sendMessageNotificationSuccess,
    sendMessageNotificationfailure,
    deleteMessageRequest,
    deleteMessageSuccess,
    deleteMessagefailure,
} from '../Reducers/messageReducer'


export const sendMessage = (data) => async (dispatch) => {
    try{
        dispatch(sendMessageRequest());
        await dispatch(sendMessageSuccess(data));
        
    }catch(error){
        dispatch(sendMessageFailure(error));
    }
}

export const sendMessageSocketFalseAction = () => async (dispatch) => {
    try{
        dispatch(sendMessageSocketFalse(false));
    }catch(error){

    }
} 

export const fetchMessages = (chatId) => async (dispatch) => {
    try{
        dispatch(fetchMessageRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };

        const {data, status} = await axios.post(`${API}/messages/`, {chatId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(fetchMessageSuccess(data));
        }
    }catch(error){
        dispatch(fetchMessageFailure(error));
    }
}


// receive messages
export const receiveMessage = (newMessageReceived) => async (dispatch) => {
    try{
        dispatch(receivedMessageRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };

        // const {data} = await axios.get(`/api/message/${chatId}`);
        dispatch(receivedMessageSuccess(newMessageReceived));
        // dispatch({
        //     type: "receivedMessageSuccess",
        //     payload: newMessageReceived,
        // });
    }catch(error){
        dispatch(receivedMessageFailure(newMessageReceived));
    }
}

// send notification action
export const sendMessageNotifications = (newMessageReceived) => async (dispatch) => {
    try{
        dispatch(sendMessageNotificationRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/messages/message_notification`, {newMessageReceived}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(sendMessageNotificationSuccess(data));
        }
    }catch(error){
        dispatch(sendMessageNotificationfailure());
    }
}


// delete message
export const deleteMessageAction = (messageId) => async (dispatch) => {
    try{
        dispatch(deleteMessageRequest());
        const token = await AsyncStorage.getItem('@token');
        const config = {
            headers: {
                "Accept": "application/json",
                "token": `${token}`
            },
        };
        const {data, status} = await axios.post(`${API}/messages/delete_message`, {messageId}, config);
        if(status == 401){
            handleResponse(status);
        }else{
            dispatch(deleteMessageSuccess(data));
        }
    }catch(error){
        dispatch(deleteMessagefailure());
    }
}
// delete message

